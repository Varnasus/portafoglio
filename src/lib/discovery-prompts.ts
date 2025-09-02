export interface DiscoveryContext {
  problemStatement?: string
  targetUsers?: string
  userJourney?: string
  keyAssumptions?: string
  validationExperiments?: string
  successMetrics?: string
  technicalConstraints?: string
  ethicalConsiderations?: string
  modelSelection?: string
  dataRequirements?: string
  evaluationFramework?: string
  timeline?: string
  conversationHistory?: Array<{
    role: 'user' | 'assistant'
    content: string
    timestamp: string
  }>
}

export class DiscoveryPrompts {
  private static readonly SYSTEM_PROMPT = `You are an expert AI product strategist and discovery consultant. You help product managers and teams develop AI-powered products through structured discovery and validation.

Your expertise includes:
- Product discovery and validation frameworks
- AI/ML product development best practices
- User research and journey mapping
- Technical feasibility assessment
- Ethical AI considerations
- Go-to-market strategy for AI products

Always provide actionable, specific guidance. Ask clarifying questions when needed. Structure your responses to be easily integrated into a discovery canvas.`

  static getInitialPrompt(): string {
    return `${this.SYSTEM_PROMPT}

I'm starting a new AI product discovery session. Please help me explore and validate my product idea through structured discovery.

What problem are you trying to solve with AI? Please describe:
1. The specific problem or pain point
2. Who experiences this problem
3. Why existing solutions are inadequate
4. The potential impact of solving this problem

I'll use your response to populate my discovery canvas and guide our conversation.`
  }

  static getProblemRefinementPrompt(context: DiscoveryContext): string {
    return `${this.SYSTEM_PROMPT}

Based on our conversation so far, let's refine your problem statement. Here's what we have so far:

Problem Statement: ${context.problemStatement || 'Not yet defined'}
Target Users: ${context.targetUsers || 'Not yet defined'}

Please help me:
1. Make the problem statement more specific and measurable
2. Identify the root cause of the problem
3. Quantify the impact (time, money, effort saved)
4. Clarify who the primary users are and their characteristics

Ask me 2-3 specific questions to help refine this further.`
  }

  static getUserJourneyPrompt(context: DiscoveryContext): string {
    return `${this.SYSTEM_PROMPT}

Now let's map the user journey for your AI product. Based on what we have:

Problem: ${context.problemStatement}
Target Users: ${context.targetUsers}

Please help me create a detailed user journey that includes:
1. Awareness: How do users discover they have this problem?
2. Consideration: What alternatives do they explore?
3. Decision: What factors influence their choice?
4. Adoption: How do they integrate your solution?
5. Retention: What keeps them using it long-term?

Focus on the emotional and practical touchpoints. What are the key moments of truth?`
  }

  static getAssumptionsPrompt(context: DiscoveryContext): string {
    return `${this.SYSTEM_PROMPT}

Let's identify and validate the key assumptions behind your AI product. Based on our discussion:

Problem: ${context.problemStatement}
Users: ${context.targetUsers}
Journey: ${context.userJourney}

Please help me identify:
1. User assumptions (what we believe about user behavior)
2. Technical assumptions (what we believe about AI/ML feasibility)
3. Market assumptions (what we believe about competition and demand)
4. Business assumptions (what we believe about monetization)

For each assumption, suggest how we could validate it quickly and cheaply.`
  }

  static getValidationExperimentsPrompt(context: DiscoveryContext): string {
    return `${this.SYSTEM_PROMPT}

Now let's design validation experiments for your key assumptions. Based on our discussion:

Key Assumptions: ${context.keyAssumptions}

Please help me create specific, actionable experiments for:
1. User research (interviews, surveys, observation)
2. Technical validation (prototypes, feasibility studies)
3. Market validation (competitive analysis, demand testing)
4. Business validation (pricing, distribution channels)

For each experiment, specify:
- What we're testing
- How we'll measure success
- Timeline and resources needed
- What we'll learn`
  }

  static getSuccessMetricsPrompt(context: DiscoveryContext): string {
    return `${this.SYSTEM_PROMPT}

Let's define success metrics for your AI product. Based on our discussion:

Problem: ${context.problemStatement}
Target Users: ${context.targetUsers}

Please help me create a comprehensive metrics framework including:
1. User metrics (adoption, engagement, satisfaction)
2. Technical metrics (accuracy, performance, reliability)
3. Business metrics (revenue, retention, growth)
4. Ethical metrics (fairness, transparency, privacy)

For each metric, specify:
- How to measure it
- Target values
- Leading vs lagging indicators
- How often to track it`
  }

  static getTechnicalConstraintsPrompt(context: DiscoveryContext): string {
    return `${this.SYSTEM_PROMPT}

Let's identify technical constraints and requirements for your AI product. Based on our discussion:

Problem: ${context.problemStatement}
Success Metrics: ${context.successMetrics}

Please help me identify:
1. Data requirements (quality, quantity, sources)
2. Model requirements (accuracy, latency, cost)
3. Infrastructure requirements (scalability, security)
4. Integration requirements (APIs, platforms)
5. Regulatory requirements (compliance, privacy)

For each constraint, specify:
- Why it's important
- How to address it
- Potential risks and mitigations`
  }

  static getEthicalConsiderationsPrompt(context: DiscoveryContext): string {
    return `${this.SYSTEM_PROMPT}

Let's address ethical considerations for your AI product. Based on our discussion:

Problem: ${context.problemStatement}
Target Users: ${context.targetUsers}
Technical Approach: ${context.technicalConstraints}

Please help me identify and address:
1. Bias and fairness concerns
2. Privacy and data protection
3. Transparency and explainability
4. Safety and security risks
5. Social impact considerations

For each concern, specify:
- Why it matters
- How to mitigate it
- How to monitor it
- Stakeholders to involve`
  }

  static getModelSelectionPrompt(context: DiscoveryContext): string {
    return `${this.SYSTEM_PROMPT}

Let's define criteria for selecting AI models for your product. Based on our discussion:

Problem: ${context.problemStatement}
Technical Constraints: ${context.technicalConstraints}
Success Metrics: ${context.successMetrics}

Please help me create a model selection framework including:
1. Performance requirements (accuracy, speed, reliability)
2. Resource requirements (compute, memory, cost)
3. Operational requirements (deployment, maintenance, updates)
4. Ethical requirements (fairness, transparency, safety)

For each criterion, specify:
- How to evaluate it
- Trade-offs to consider
- Minimum acceptable values
- How to test it`
  }

  static getDataRequirementsPrompt(context: DiscoveryContext): string {
    return `${this.SYSTEM_PROMPT}

Let's define data requirements for your AI product. Based on our discussion:

Problem: ${context.problemStatement}
Model Selection: ${context.modelSelection}
Technical Constraints: ${context.technicalConstraints}

Please help me specify:
1. Data types and sources needed
2. Data quality requirements
3. Data quantity requirements
4. Data privacy and security requirements
5. Data governance and compliance needs

For each requirement, specify:
- Why it's needed
- How to acquire it
- How to validate it
- Risks and mitigations
- Timeline for collection`
  }

  static getEvaluationFrameworkPrompt(context: DiscoveryContext): string {
    return `${this.SYSTEM_PROMPT}

Let's create an evaluation framework for your AI product. Based on our discussion:

Problem: ${context.problemStatement}
Success Metrics: ${context.successMetrics}
Model Selection: ${context.modelSelection}

Please help me design:
1. Model evaluation metrics and benchmarks
2. User testing protocols
3. A/B testing frameworks
4. Continuous monitoring systems
5. Feedback collection mechanisms

For each component, specify:
- What to measure
- How to measure it
- When to measure it
- How to act on results
- Who is responsible`
  }

  static getTimelinePrompt(context: DiscoveryContext): string {
    return `${this.SYSTEM_PROMPT}

Let's create a development timeline for your AI product. Based on our discussion:

Problem: ${context.problemStatement}
Validation Experiments: ${context.validationExperiments}
Technical Constraints: ${context.technicalConstraints}

Please help me create a realistic timeline including:
1. Discovery and validation phases
2. Technical development phases
3. Testing and iteration phases
4. Launch and scaling phases

For each phase, specify:
- Key milestones and deliverables
- Dependencies and blockers
- Resource requirements
- Success criteria
- Risk mitigation strategies`
  }

  static getReportGenerationPrompt(context: DiscoveryContext): string {
    return `${this.SYSTEM_PROMPT}

Based on our complete discovery session, please generate a comprehensive product discovery report. Include all the information we've gathered:

${Object.entries(context)
  .filter(([key, value]) => key !== 'conversationHistory' && value)
  .map(([key, value]) => `${key}: ${value}`)
  .join('\n')}

Please structure the report as follows:

# AI Product Discovery Report

## Executive Summary
Brief overview of the product concept and key findings

## Problem Statement
Clear definition of the problem being solved

## Target Users
Detailed user personas and characteristics

## User Journey
Complete journey map from awareness to retention

## Key Assumptions & Validation
List of assumptions and validation experiments

## Success Metrics
Comprehensive metrics framework

## Technical Requirements
Constraints, model selection, and data requirements

## Ethical Considerations
Fairness, privacy, and safety considerations

## Evaluation Framework
Testing protocols and monitoring systems

## Timeline
Development phases and milestones

## Recommendations
Next steps and priority actions

Make the report professional, actionable, and ready for stakeholder review.`
  }

  static getConversationContextPrompt(context: DiscoveryContext): string {
    const history = context.conversationHistory || []
    const recentHistory = history.slice(-6) // Last 6 exchanges for context
    
    return `${this.SYSTEM_PROMPT}

This is an ongoing discovery session. Here's our recent conversation history:

${recentHistory.map(exchange => `${exchange.role}: ${exchange.content}`).join('\n\n')}

Current canvas state:
${Object.entries(context)
  .filter(([key, value]) => key !== 'conversationHistory' && value)
  .map(([key, value]) => `${key}: ${value}`)
  .join('\n')}

Please continue our discovery session, building on what we've discussed. Ask clarifying questions, provide insights, and help me refine my thinking. Focus on the areas that need more exploration or validation.`
  }
}
