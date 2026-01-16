'use client'

import { useState } from "react"
import { useI18n } from "@/lib/i18n/context"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TrendingUp, ShoppingCart, CreditCard, Package, Users } from "lucide-react"
import { saveShopName, saveShopDescription, saveShopLogo, saveLowStockThreshold, saveCheckinReward, saveCheckinEnabled, saveNoIndex } from "@/actions/admin"
import { toast } from "sonner"

interface Stats {
    today: { count: number; revenue: number }
    week: { count: number; revenue: number }
    month: { count: number; revenue: number }
    total: { count: number; revenue: number }
}

interface AdminSettingsContentProps {
    stats: Stats
    shopName: string | null
    shopDescription: string | null
    shopLogo: string | null
    visitorCount: number
    lowStockThreshold: number
    checkinReward: number
    checkinEnabled: boolean
    noIndexEnabled: boolean
}

export function AdminSettingsContent({ stats, shopName, shopDescription, shopLogo, visitorCount, lowStockThreshold, checkinReward, checkinEnabled, noIndexEnabled }: AdminSettingsContentProps) {
    const { t } = useI18n()

    // State
    const [shopNameValue, setShopNameValue] = useState(shopName || '')
    const [savingShopName, setSavingShopName] = useState(false)
    const [shopDescValue, setShopDescValue] = useState(shopDescription || '')
    const [savingShopDesc, setSavingShopDesc] = useState(false)
    const [shopLogoValue, setShopLogoValue] = useState(shopLogo || '')
    const [savingShopLogo, setSavingShopLogo] = useState(false)
    const [thresholdValue, setThresholdValue] = useState(String(lowStockThreshold || 5))
    const [savingThreshold, setSavingThreshold] = useState(false)
    const [rewardValue, setRewardValue] = useState(String(checkinReward || 10))
    const [savingReward, setSavingReward] = useState(false)
    const [enabledCheckin, setEnabledCheckin] = useState(checkinEnabled)
    const [savingEnabled, setSavingEnabled] = useState(false)
    const [enabledNoIndex, setEnabledNoIndex] = useState(noIndexEnabled)
    const [savingNoIndex, setSavingNoIndex] = useState(false)

    const handleSaveShopName = async () => {
        const trimmed = shopNameValue.trim()
        if (!trimmed) {
            toast.error(t('admin.settings.shopNameEmpty'))
            return
        }
        setSavingShopName(true)
        try {
            await saveShopName(trimmed)
            toast.success(t('common.success'))
        } catch (e: any) {
            toast.error(e.message)
        } finally {
            setSavingShopName(false)
        }
    }

    const handleSaveShopDesc = async () => {
        setSavingShopDesc(true)
        try {
            await saveShopDescription(shopDescValue)
            toast.success(t('common.success'))
        } catch (e: any) {
            toast.error(e.message)
        } finally {
            setSavingShopDesc(false)
        }
    }

    const handleSaveShopLogo = async () => {
        setSavingShopLogo(true)
        try {
            await saveShopLogo(shopLogoValue)
            toast.success(t('common.success'))
        } catch (e: any) {
            toast.error(e.message)
        } finally {
            setSavingShopLogo(false)
        }
    }

    const handleSaveThreshold = async () => {
        setSavingThreshold(true)
        try {
            await saveLowStockThreshold(thresholdValue)
            toast.success(t('common.success'))
        } catch (e: any) {
            toast.error(e.message)
        } finally {
            setSavingThreshold(false)
        }
    }

    const handleSaveReward = async () => {
        setSavingReward(true)
        try {
            await saveCheckinReward(rewardValue)
            toast.success(t('common.success'))
        } catch (e: any) {
            toast.error(e.message)
        } finally {
            setSavingReward(false)
        }
    }

    const handleToggleCheckin = async (checked: boolean) => {
        setSavingEnabled(true)
        try {
            await saveCheckinEnabled(checked)
            setEnabledCheckin(checked)
            toast.success(t('common.success'))
        } catch (e: any) {
            toast.error(e.message)
        } finally {
            setSavingEnabled(false)
        }
    }

    const handleToggleNoIndex = async (checked: boolean) => {
        setSavingNoIndex(true)
        try {
            await saveNoIndex(checked)
            setEnabledNoIndex(checked)
            toast.success(t('common.success'))
        } catch (e: any) {
            toast.error(e.message)
        } finally {
            setSavingNoIndex(false)
        }
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">{t('common.storeSettings')}</h1>

            {/* Shop Settings */}
            <Card>
                <CardHeader>
                    <CardTitle>{t('admin.settings.title')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-2 md:max-w-xl">
                        <Label htmlFor="shop-name">{t('admin.settings.shopName')}</Label>
                        <div className="flex gap-2">
                            <Input
                                id="shop-name"
                                value={shopNameValue}
                                onChange={(e) => setShopNameValue(e.target.value)}
                                placeholder={t('admin.settings.shopNamePlaceholder')}
                            />
                            <Button onClick={handleSaveShopName} disabled={savingShopName}>
                                {savingShopName ? t('common.processing') : t('common.save')}
                            </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">{t('admin.settings.shopNameHint')}</p>
                    </div>
                    <div className="grid gap-2 md:max-w-xl">
                        <Label htmlFor="shop-desc">{t('admin.settings.shopDescription')}</Label>
                        <div className="flex gap-2">
                            <Input
                                id="shop-desc"
                                value={shopDescValue}
                                onChange={(e) => setShopDescValue(e.target.value)}
                                placeholder={t('admin.settings.shopDescPlaceholder')}
                            />
                            <Button variant="outline" onClick={handleSaveShopDesc} disabled={savingShopDesc}>
                                {savingShopDesc ? t('common.processing') : t('common.save')}
                            </Button>
                        </div>
                    </div>
                    <div className="grid gap-2 md:max-w-xl">
                        <Label htmlFor="shop-logo">{t('admin.settings.shopLogo')}</Label>
                        <div className="flex gap-2">
                            <Input
                                id="shop-logo"
                                value={shopLogoValue}
                                onChange={(e) => setShopLogoValue(e.target.value)}
                                placeholder={t('admin.settings.shopLogoPlaceholder')}
                            />
                            <Button variant="outline" onClick={handleSaveShopLogo} disabled={savingShopLogo}>
                                {savingShopLogo ? t('common.processing') : t('common.save')}
                            </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">{t('admin.settings.shopLogoHint')}</p>
                        {shopLogoValue && (
                            <div className="flex items-center gap-4 p-2 border rounded-md bg-muted/50">
                                <img src={shopLogoValue} alt="Logo preview" className="h-8 w-8 object-contain" />
                                <span className="text-sm text-muted-foreground">{t('admin.settings.logoPreview')}</span>
                            </div>
                        )}
                    </div>
                    <div className="grid gap-2 md:max-w-xs">
                        <Label htmlFor="low-stock">{t('admin.settings.lowStockThreshold')}</Label>
                        <div className="flex gap-2">
                            <Input
                                id="low-stock"
                                type="number"
                                value={thresholdValue}
                                onChange={(e) => setThresholdValue(e.target.value)}
                                placeholder="5"
                            />
                            <Button variant="outline" onClick={handleSaveThreshold} disabled={savingThreshold}>
                                {savingThreshold ? t('common.processing') : t('common.save')}
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Checkin Settings */}
            <Card>
                <CardHeader>
                    <CardTitle>{t('admin.settings.checkin.title')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                        <Label htmlFor="checkin-enable" className="cursor-pointer">{t('admin.settings.checkin.title')}</Label>
                        <Button
                            id="checkin-enable"
                            variant={enabledCheckin ? "default" : "outline"}
                            size="sm"
                            onClick={() => handleToggleCheckin(!enabledCheckin)}
                            disabled={savingEnabled}
                            className={enabledCheckin ? "bg-green-600 hover:bg-green-700" : ""}
                        >
                            {enabledCheckin ? t('admin.settings.checkin.enabled') : t('admin.settings.checkin.disabled')}
                        </Button>
                    </div>
                    {enabledCheckin && (
                        <div className="grid gap-2 md:max-w-xs">
                            <Label htmlFor="checkin-reward">{t('admin.settings.checkin.rewardTooltip')}</Label>
                            <div className="flex gap-2">
                                <Input
                                    id="checkin-reward"
                                    type="number"
                                    value={rewardValue}
                                    onChange={(e) => setRewardValue(e.target.value)}
                                    placeholder="10"
                                />
                                <Button variant="outline" onClick={handleSaveReward} disabled={savingReward}>
                                    {savingReward ? t('common.processing') : t('common.save')}
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* SEO Settings */}
            <Card>
                <CardHeader>
                    <CardTitle>{t('admin.settings.noIndex.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-4">
                        <Label htmlFor="noindex-enable" className="cursor-pointer">{t('admin.settings.noIndex.title')}</Label>
                        <Button
                            id="noindex-enable"
                            variant={enabledNoIndex ? "default" : "outline"}
                            size="sm"
                            onClick={() => handleToggleNoIndex(!enabledNoIndex)}
                            disabled={savingNoIndex}
                            className={enabledNoIndex ? "bg-orange-600 hover:bg-orange-700" : ""}
                        >
                            {enabledNoIndex ? t('admin.settings.noIndex.enabled') : t('admin.settings.noIndex.disabled')}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Dashboard Stats */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{t('admin.stats.today')}</CardTitle>
                        <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.today.count}</div>
                        <p className="text-xs text-muted-foreground">{stats.today.revenue.toFixed(0)} {t('common.credits')}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{t('admin.stats.week')}</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.week.count}</div>
                        <p className="text-xs text-muted-foreground">{stats.week.revenue.toFixed(0)} {t('common.credits')}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{t('admin.stats.month')}</CardTitle>
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.month.count}</div>
                        <p className="text-xs text-muted-foreground">{stats.month.revenue.toFixed(0)} {t('common.credits')}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{t('admin.stats.total')}</CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.total.count}</div>
                        <p className="text-xs text-muted-foreground">{stats.total.revenue.toFixed(0)} {t('common.credits')}</p>
                    </CardContent>
                </Card>
                <Link href="/admin/users" className="block">
                    <Card className="hover:bg-accent/50 transition-colors h-full">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{t('admin.stats.visitors')}</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{visitorCount}</div>
                            <p className="text-xs text-muted-foreground">{t('home.visitorCount', { count: visitorCount })}</p>
                        </CardContent>
                    </Card>
                </Link>
            </div>
        </div>
    )
}
