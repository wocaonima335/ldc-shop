import { getDashboardStats, getSetting, getVisitorCount } from "@/lib/db/queries"
import { AdminSettingsContent } from "@/components/admin/settings-content"

export default async function AdminSettingsPage() {
    const [stats, shopName, shopDescription, shopLogo, visitorCount, lowStockThreshold, checkinReward, checkinEnabled, noIndexEnabled] = await Promise.all([
        getDashboardStats(),
        (async () => {
            try {
                return await getSetting('shop_name')
            } catch {
                return null
            }
        })(),
        (async () => {
            try {
                return await getSetting('shop_description')
            } catch {
                return null
            }
        })(),
        (async () => {
            try {
                return await getSetting('shop_logo')
            } catch {
                return null
            }
        })(),
        (async () => {
            try {
                return await getVisitorCount()
            } catch {
                return 0
            }
        })(),
        (async () => {
            try {
                const v = await getSetting('low_stock_threshold')
                return Number.parseInt(v || '5', 10) || 5
            } catch {
                return 5
            }
        })(),
        (async () => {
            try {
                const v = await getSetting('checkin_reward')
                return Number.parseInt(v || '10', 10) || 10
            } catch {
                return 10
            }
        })(),
        (async () => {
            try {
                const v = await getSetting('checkin_enabled')
                return v !== 'false' // Default to true
            } catch {
                return true
            }
        })(),
        (async () => {
            try {
                const v = await getSetting('noindex_enabled')
                return v === 'true'
            } catch {
                return false
            }
        })(),
    ])

    return (
        <AdminSettingsContent
            stats={stats}
            shopName={shopName}
            shopDescription={shopDescription}
            shopLogo={shopLogo}
            visitorCount={visitorCount}
            lowStockThreshold={lowStockThreshold}
            checkinReward={checkinReward}
            checkinEnabled={checkinEnabled}
            noIndexEnabled={noIndexEnabled}
        />
    )
}
