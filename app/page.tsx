'use client'

import { useState, useEffect } from 'react'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PricingCalculator() {
  const [seats, setSeats] = useState(1)
  const [usage, setUsage] = useState([0])
  const [discountTier, setDiscountTier] = useState('none')
  const [totalPrice, setTotalPrice] = useState(0)

  const SEAT_PRICE = 10
  const USAGE_RATE = 0.05
  const DISCOUNT_RATES = {
    none: 0,
    starter: 0.10,
    pro: 0.15,
    enterprise: 0.20
  }

  useEffect(() => {
    const seatCost = seats * SEAT_PRICE
    const usageCost = usage[0] * USAGE_RATE
    const subtotal = seatCost + usageCost
    const discount = subtotal * DISCOUNT_RATES[discountTier as keyof typeof DISCOUNT_RATES]
    const final = subtotal - discount
    setTotalPrice(final)
  }, [seats, usage, discountTier])

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              SaaS Pricing Calculator
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="seats">Number of Seats</Label>
              <Input
                id="seats"
                type="number"
                min="1"
                value={seats}
                onChange={(e) => setSeats(parseInt(e.target.value) || 1)}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label>Monthly Usage (Units)</Label>
              <div className="pt-2">
                <Slider
                  defaultValue={[0]}
                  min={0}
                  max={1000}
                  step={1}
                  value={usage}
                  onValueChange={setUsage}
                  className="w-full"
                />
              </div>
              <div className="text-sm text-gray-500 text-right">
                {usage[0]} units
              </div>
            </div>

            <div className="space-y-2">
              <Label>Discount Tier</Label>
              <Select
                value={discountTier}
                onValueChange={setDiscountTier}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a tier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None (0% off)</SelectItem>
                  <SelectItem value="starter">Starter (10% off)</SelectItem>
                  <SelectItem value="pro">Pro (15% off)</SelectItem>
                  <SelectItem value="enterprise">Enterprise (20% off)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mt-8 p-6 bg-gray-100 rounded-lg">
              <div className="text-lg font-semibold">Price Breakdown:</div>
              <div className="mt-2 space-y-1">
                <div className="flex justify-between">
                  <span>Seats ({seats} × ${SEAT_PRICE}):</span>
                  <span>${(seats * SEAT_PRICE).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Usage ({usage[0]} units × ${USAGE_RATE}):</span>
                  <span>${(usage[0] * USAGE_RATE).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Discount ({(DISCOUNT_RATES[discountTier as keyof typeof DISCOUNT_RATES] * 100)}%):</span>
                  <span>-${((seats * SEAT_PRICE + usage[0] * USAGE_RATE) * DISCOUNT_RATES[discountTier as keyof typeof DISCOUNT_RATES]).toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-bold text-xl">
                    <span>Total Monthly Price:</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
