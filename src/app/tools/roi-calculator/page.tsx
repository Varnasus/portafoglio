import { ROICalculator } from "@/components/tools/roi-calculator"

export const metadata = {
  title: "AI ROI Calculator | Zach Varney - AI Technical Product Manager",
  description: "Calculate the return on investment for AI implementation projects. Interactive tool to estimate cost savings, time reduction, and ROI metrics.",
  keywords: "AI ROI calculator, AI implementation cost, AI project ROI, AI investment calculator",
}

export default function ROICalculatorPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
              AI ROI Calculator
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Estimate the return on investment for your AI implementation project. 
              Input your team details and project parameters to see potential cost savings and ROI.
            </p>
          </div>
          
          <ROICalculator />
          
          <div className="mt-12 p-6 bg-muted/50 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">How to Use This Calculator</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• <strong>Team Size:</strong> Number of people who will use the AI solution</li>
              <li>• <strong>Time Saved:</strong> Hours saved per person per week with AI automation</li>
              <li>• <strong>Cost per Hour:</strong> Average hourly cost of your team members</li>
              <li>• <strong>Implementation Cost:</strong> Total cost to build and deploy the AI solution</li>
              <li>• <strong>Timeline:</strong> Expected time to see full ROI (in months)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
