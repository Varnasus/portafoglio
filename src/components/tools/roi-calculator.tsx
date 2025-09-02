"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from "recharts"
import { Copy, Download, Share2 } from "lucide-react"

interface ROIData {
  teamSize: number
  timeSavedPerWeek: number
  costPerHour: number
  implementationCost: number
  timeline: number
}

interface CalculationResults {
  weeklySavings: number
  monthlySavings: number
  yearlySavings: number
  paybackPeriod: number
  totalROI: number
  monthlyROI: number
  cumulativeSavings: number[]
  monthlyData: Array<{
    month: number
    cumulativeSavings: number
    roi: number
  }>
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export function ROICalculator() {
  const [data, setData] = useState<ROIData>({
    teamSize: 10,
    timeSavedPerWeek: 5,
    costPerHour: 50,
    implementationCost: 50000,
    timeline: 12
  })

  const [results, setResults] = useState<CalculationResults | null>(null)
  const [copied, setCopied] = useState(false)

  const calculateROI = (input: ROIData): CalculationResults => {
    const weeklySavings = input.teamSize * input.timeSavedPerWeek * input.costPerHour
    const monthlySavings = weeklySavings * 4.33 // Average weeks per month
    const yearlySavings = monthlySavings * 12
    const paybackPeriod = input.implementationCost / monthlySavings
    const totalROI = ((yearlySavings - input.implementationCost) / input.implementationCost) * 100
    const monthlyROI = ((monthlySavings - (input.implementationCost / 12)) / (input.implementationCost / 12)) * 100

    const cumulativeSavings: number[] = []
    const monthlyData = []

    for (let month = 1; month <= input.timeline; month++) {
      const cumulative = monthlySavings * month - input.implementationCost
      cumulativeSavings.push(cumulative)
      monthlyData.push({
        month,
        cumulativeSavings: cumulative,
        roi: cumulative > 0 ? (cumulative / input.implementationCost) * 100 : 0
      })
    }

    return {
      weeklySavings,
      monthlySavings,
      yearlySavings,
      paybackPeriod,
      totalROI,
      monthlyROI,
      cumulativeSavings,
      monthlyData
    }
  }

  useEffect(() => {
    setResults(calculateROI(data))
  }, [data])

  const handleInputChange = (field: keyof ROIData, value: number) => {
    setData(prev => ({ ...prev, [field]: value }))
  }

  const copyToClipboard = async () => {
    if (!results) return
    
    const text = `AI ROI Calculator Results:
Team Size: ${data.teamSize}
Time Saved per Week: ${data.timeSavedPerWeek} hours
Cost per Hour: $${data.costPerHour}
Implementation Cost: $${data.implementationCost.toLocaleString()}
Timeline: ${data.timeline} months

Results:
Weekly Savings: $${results.weeklySavings.toLocaleString()}
Monthly Savings: $${results.monthlySavings.toLocaleString()}
Yearly Savings: $${results.yearlySavings.toLocaleString()}
Payback Period: ${results.paybackPeriod.toFixed(1)} months
Total ROI: ${results.totalROI.toFixed(1)}%
Monthly ROI: ${results.monthlyROI.toFixed(1)}%`

    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy to clipboard:', err)
    }
  }

  const shareResults = () => {
    const url = new URL(window.location.href)
    url.searchParams.set('teamSize', data.teamSize.toString())
    url.searchParams.set('timeSaved', data.timeSavedPerWeek.toString())
    url.searchParams.set('costPerHour', data.costPerHour.toString())
    url.searchParams.set('implementationCost', data.implementationCost.toString())
    url.searchParams.set('timeline', data.timeline.toString())
    
    if (navigator.share) {
      navigator.share({
        title: 'AI ROI Calculator Results',
        text: `Check out these AI ROI results: ${results?.totalROI.toFixed(1)}% ROI over ${data.timeline} months!`,
        url: url.toString()
      })
    } else {
      copyToClipboard()
    }
  }

  const pieData = results ? [
    { name: 'Implementation Cost', value: data.implementationCost },
    { name: 'Year 1 Savings', value: Math.max(0, results.yearlySavings - data.implementationCost) }
  ] : []

  return (
    <div className="space-y-8">
      {/* Input Form */}
      <Card>
        <CardHeader>
          <CardTitle>Project Parameters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="teamSize">Team Size</Label>
              <Input
                id="teamSize"
                type="number"
                value={data.teamSize}
                onChange={(e) => handleInputChange('teamSize', Number(e.target.value))}
                min="1"
                max="1000"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="timeSaved">Time Saved per Week (hours)</Label>
              <Input
                id="timeSaved"
                type="number"
                value={data.timeSavedPerWeek}
                onChange={(e) => handleInputChange('timeSavedPerWeek', Number(e.target.value))}
                min="0.5"
                max="40"
                step="0.5"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="costPerHour">Cost per Hour ($)</Label>
              <Input
                id="costPerHour"
                type="number"
                value={data.costPerHour}
                onChange={(e) => handleInputChange('costPerHour', Number(e.target.value))}
                min="10"
                max="500"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="implementationCost">Implementation Cost ($)</Label>
              <Input
                id="implementationCost"
                type="number"
                value={data.implementationCost}
                onChange={(e) => handleInputChange('implementationCost', Number(e.target.value))}
                min="1000"
                max="1000000"
                step="1000"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="timeline">Timeline (months)</Label>
              <Input
                id="timeline"
                type="number"
                value={data.timeline}
                onChange={(e) => handleInputChange('timeline', Number(e.target.value))}
                min="3"
                max="60"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {results && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-green-600">
                  ${results.weeklySavings.toLocaleString()}
                </div>
                <p className="text-sm text-muted-foreground">Weekly Savings</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-blue-600">
                  ${results.monthlySavings.toLocaleString()}
                </div>
                <p className="text-sm text-muted-foreground">Monthly Savings</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-purple-600">
                  {results.paybackPeriod.toFixed(1)} months
                </div>
                <p className="text-sm text-muted-foreground">Payback Period</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-orange-600">
                  {results.totalROI.toFixed(1)}%
                </div>
                <p className="text-sm text-muted-foreground">Total ROI</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>ROI Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={results.monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value: number) => [`${value.toFixed(1)}%`, 'ROI']}
                      labelFormatter={(label) => `Month ${label}`}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="roi" 
                      stroke="#8884d8" 
                      strokeWidth={2}
                      dot={{ fill: '#8884d8', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cost vs Savings</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}`, 'Amount']} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Cumulative Savings Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Cumulative Savings Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={results.monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value: number) => [`$${value.toLocaleString()}`, 'Cumulative Savings']}
                    labelFormatter={(label) => `Month ${label}`}
                  />
                  <Bar 
                    dataKey="cumulativeSavings" 
                    fill="#00C49F"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Button onClick={copyToClipboard} variant="outline">
              <Copy className="w-4 h-4 mr-2" />
              {copied ? 'Copied!' : 'Copy Results'}
            </Button>
            <Button onClick={shareResults} variant="outline">
              <Share2 className="w-4 h-4 mr-2" />
              Share Results
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
