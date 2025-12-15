import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import { absoluteUrl } from "@/lib/utils";
import { ProductType } from "@/lib/types";

export async function GET(req: NextRequest) {
    try {
        const supabase = await createClient();
        // Check for admin role if applicable, for now assuming authenticated user in dashboard context
        // Ideally we check if user.role === 'admin'
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Fetch products from Stripe
        const products = await stripe.products.list({
            active: true,
            expand: ["data.default_price"],
            limit: 100,
        });

        // Map to our plan format
        const plans = products.data.map((product) => {
            const price = product.default_price as Stripe.Price;
            const amount = price?.unit_amount ? price.unit_amount / 100 : 0;

            return {
                id: product.id,
                name: product.name,
                description: product.description,
                price: amount,
                currency: price?.currency || 'usd',
                interval: price?.recurring?.interval || 'month',
                type: product.metadata.type || ProductType.PLAN,
                active: product.active,
                features: product.metadata.features ? JSON.parse(product.metadata.features) : [],
                stripePriceId: price?.id
            };
        });

        // Sort by price for display
        plans.sort((a, b) => a.price - b.price);

        return NextResponse.json(plans);
    } catch (error) {
        console.error("[ADMIN_PLANS_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { id, name, description, price, features } = body;

        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // 1. If updating existing product
        if (id) {
            const product = await stripe.products.retrieve(id);

            // Check if price changed
            const currentPrice = product.default_price as string;
            let newPriceId = currentPrice;

            if (price !== undefined) {
                // Even if we don't have the old price object expanded, we can check if we want to update it.
                // Actually, best practice is to create a NEW price if amount changed.
                const oldPriceObj = currentPrice ? await stripe.prices.retrieve(currentPrice) : null;
                const oldAmount = oldPriceObj?.unit_amount ? oldPriceObj.unit_amount / 100 : 0;

                if (price !== oldAmount) {
                    const priceObj = await stripe.prices.create({
                        product: id,
                        unit_amount: Math.round(price * 100),
                        currency: 'usd',
                        recurring: { interval: 'month' },
                    });
                    newPriceId = priceObj.id;
                }
            }

            // Update Product
            await stripe.products.update(id, {
                name,
                description,
                default_price: newPriceId,
                metadata: {
                    type: ProductType.PLAN, // Enforce type=plan
                    features: JSON.stringify(features || []),
                }
            });

            return NextResponse.json({ success: true });

        } else {
            // 2. Create New Product - DISABLED
            return new NextResponse("Creating new plans is not allowed", { status: 403 });
        }

    } catch (error) {
        console.error("[ADMIN_PLANS_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
