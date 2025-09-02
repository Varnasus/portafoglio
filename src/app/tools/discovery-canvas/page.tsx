import { DiscoveryCanvas } from "@/components/tools/discovery-canvas"

export const metadata = {
  title: "Product Discovery Canvas | Zach Varney - AI Technical Product Manager",
  description: "Interactive product discovery canvas for AI product development. Plan, validate, and structure your AI product ideas with this comprehensive tool.",
  keywords: "product discovery canvas, AI product development, product strategy, product planning tool",
}

export default function DiscoveryCanvasPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
              Product Discovery Canvas
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Structure your AI product discovery process with this interactive canvas. 
              Plan your product strategy, validate assumptions, and align stakeholders on your AI product vision.
            </p>
          </div>
          
          <DiscoveryCanvas />
          
          <div className="mt-12 p-6 bg-muted/50 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">How to Use This Canvas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium mb-2">Discovery Process</h4>
                <ul className="space-y-1">
                  <li>• Start with the Problem Statement</li>
                  <li>• Define your Target Users</li>
                  <li>• Map the User Journey</li>
                  <li>• Identify Key Assumptions</li>
                  <li>• Plan Validation Experiments</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">AI-Specific Considerations</h4>
                <ul className="space-y-1">
                  <li>• Model Selection Criteria</li>
                  <li>• Data Requirements</li>
                  <li>• Evaluation Metrics</li>
                  <li>• Ethical Considerations</li>
                  <li>• Technical Constraints</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
