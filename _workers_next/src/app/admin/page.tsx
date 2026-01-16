import { getProducts, getSetting } from "@/lib/db/queries"
import { AdminProductsContent } from "@/components/admin/products-content"

export default async function AdminPage() {
    const [products, lowStockThreshold] = await Promise.all([
        getProducts(),
        (async () => {
            try {
                const v = await getSetting('low_stock_threshold')
                return Number.parseInt(v || '5', 10) || 5
            } catch {
                return 5
            }
        })(),
    ])

    return (
        <AdminProductsContent
            products={products.map((p: any) => ({
                id: p.id,
                name: p.name,
                price: p.price,
                compareAtPrice: p.compareAtPrice ?? null,
                category: p.category,
                stockCount: p.stock,
                isActive: p.isActive ?? true,
                isHot: p.isHot ?? false,
                sortOrder: p.sortOrder ?? 0
            }))}
            lowStockThreshold={lowStockThreshold}
        />
    )
}
