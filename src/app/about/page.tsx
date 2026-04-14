import { Container } from "@/components/ui/container"

export const metadata = {
  title: "About",
  description:
    "AI builder. Problem solver. Craftsman with a wand. Ranger Ventures LLC — Kansas City, MO.",
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight font-serif mb-5">
      {children}
    </h2>
  )
}

function Divider() {
  return (
    <div className="flex items-center gap-4 my-14" aria-hidden>
      <span className="h-px flex-1 bg-border/60" />
      <span className="text-primary/60 font-mono text-xs tracking-widest">
        {"///"}
      </span>
      <span className="h-px flex-1 bg-border/60" />
    </div>
  )
}

export default function AboutPage() {
  return (
    <section className="py-20 md:py-32">
      <Container>
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4">
            About
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6 font-serif">
            About Zach Varney.
          </h1>
          <p className="text-xl sm:text-2xl leading-9 font-serif text-primary mb-14">
            AI builder. Problem solver. Craftsman with a wand.
          </p>

          {/* The Short Version */}
          <SectionHeading>The Short Version</SectionHeading>
          <div className="space-y-5 text-lg leading-8 text-muted-foreground">
            <p>
              I&apos;m Zach Varney, founder of Ranger Ventures. I build
              AI-powered tools and middleware for companies that know AI
              matters but need someone who can actually get them there.
            </p>
            <p>
              I&apos;m not an evangelist. I&apos;m not here to convince you AI
              is a thing. I&apos;m on the forefront of it, shipping production
              code every day &mdash; and if you&apos;re ready to move,
              I&apos;m the guy who makes it happen.
            </p>
          </div>

          <Divider />

          {/* Before AI */}
          <SectionHeading>Before AI</SectionHeading>
          <div className="space-y-5 text-lg leading-8 text-muted-foreground">
            <p>
              I&apos;ve been the kind of person who can&apos;t sit still my
              whole career. Logistics, mortgage origination, B2B SaaS
              &mdash; different industries, same wiring. I was the
              go-getter. The high achiever. The guy who walked into a room
              with a stack of ideas and three ways to fix whatever was
              broken before the meeting was over.
            </p>
            <p>
              Most of those ideas never made it out of the room. Not
              because they were wrong &mdash; because they were expensive.
              Engineering was booked out two quarters. Budget was committed
              somewhere else. Priorities were locked. That&apos;s not a
              complaint; that&apos;s just what it looks like to be one
              person with more ideas than runway.
            </p>
            <p className="text-foreground font-medium">
              Then AI showed up, and it felt like finding out magic was
              real and someone had handed me a wand.
            </p>
            <p>
              I still had to learn how to swish and flick it &mdash; that
              part was real work &mdash; but from the moment I picked it
              up, I knew I was going to be a wizard.
            </p>
          </div>

          <Divider />

          {/* The Ceiling */}
          <SectionHeading>The Ceiling</SectionHeading>
          <div className="space-y-5 text-lg leading-8 text-muted-foreground">
            <p>
              Here&apos;s the thing about giving everyone a wand: everyone
              can do the same magic tricks. The moment a capability gets
              democratized, it stops being a differentiator. It becomes
              table stakes.
            </p>
            <p>
              That&apos;s where a lot of companies are finding themselves
              right now. They invested in &ldquo;having AI&rdquo; as a
              strategy &mdash; picked vendors, ran POCs, stamped it on the
              roadmap &mdash; and then looked up to realize everyone else
              had done the exact same thing. Waving the wand was never
              going to be the moat. It was always the baseline.
            </p>
            <p>
              So where&apos;s the pivot? It has to be back to the thing AI
              can&apos;t commoditize: the person holding the wand. Taste.
              Judgment. The instinct for what&apos;s actually worth
              building, and the speed to ship it before the conversation
              catches up.
            </p>
            <p className="text-foreground font-medium">
              That&apos;s the ceiling companies are staring at now &mdash;
              and it&apos;s the gap I walked into.
            </p>
          </div>

          <Divider />

          {/* The Shift */}
          <SectionHeading>The Shift</SectionHeading>
          <div className="space-y-5 text-lg leading-8 text-muted-foreground">
            <p>
              I don&apos;t remember one moment. I remember a handful of
              them.
            </p>
            <p>
              One was sitting in Cursor, building an agent orchestration
              layer &mdash; the kind of thing that would&apos;ve been a
              multi-sprint initiative at any company I&apos;d worked at
              &mdash; and having it running in an afternoon.
            </p>
            <p>
              The other was Otter.ai. I&apos;d been paying $20 a month for
              transcriptions I only used a few times a month. Good tool,
              fair price &mdash; I wasn&apos;t mad at it. But one night I
              started poking at what it would take to do it myself, and a
              few hours later I had a batch processing pipeline running
              for roughly five cents per transcribed hour. And because it
              was batching, I could push a whole stack of audio through in
              one pass instead of feeding it one file at a time. Same
              output, faster, and I think I paid for a year of it with the
              change in my car door.
            </p>
            <p>
              That&apos;s when it clicked:{" "}
              <strong className="text-foreground font-semibold">
                software has been solved
              </strong>
              . The only limit now is how creative you are and how fast
              you can move. Every &ldquo;wrapper&rdquo; company people
              used to mock? That&apos;s exactly what non-technical buyers
              want.{" "}
              <strong className="text-foreground font-semibold">
                CEOs aren&apos;t trying to become prompt engineers
              </strong>{" "}
              &mdash; they want something that works so they can get back
              to their day. And I can build that.
            </p>
          </div>

          <Divider />

          {/* How I Work Now */}
          <SectionHeading>How I Work Now</SectionHeading>
          <div className="space-y-5 text-lg leading-8 text-muted-foreground">
            <p className="text-foreground font-medium">
              I move fast because I don&apos;t have to wait on anyone else
              to move with me.
            </p>
            <p>
              That&apos;s not a knock on teams &mdash; I&apos;ve spent most
              of my career on them, and the good ones are worth their
              weight. It&apos;s just the shape of how I work now. I have
              agents running research, analysis, and synthesis alongside
              me. They know what I&apos;m trying to figure out, and
              they&apos;re the ones doing the legwork on what the market
              actually cares about.
            </p>
            <p>
              Give me a few hours with your API keys and logins and
              I&apos;ll have something real to show you &mdash; a Slack
              bot that actually knows what&apos;s in your Notion, a
              dashboard pulling live data out of Stripe and HubSpot, a
              Linear-to-GitHub bridge that stops losing issues, a
              Supabase view glued to your analytics stack. Most of what I
              end up building is just plugging the gaps between the
              systems your team has been working around for months.
            </p>
            <p>
              I&apos;m not trying to reinvent the wheel. A lot of problems
              on this planet have already been solved well. I reuse what
              works, optimize as I go, and ship.
            </p>
          </div>

          <Divider />

          {/* The Craftsman and the Weapon */}
          <SectionHeading>The Craftsman and the Weapon</SectionHeading>
          <div className="space-y-5 text-lg leading-8 text-muted-foreground">
            <p>
              Here&apos;s what I believe, and it&apos;s the thing most people
              get wrong about AI right now:
            </p>
            <p className="text-foreground font-medium">
              AI is a tool. It&apos;s not a strategy. It&apos;s not a
              solution. It&apos;s an extension of you.
            </p>
            <p>
              Look at any master of their craft &mdash; a swordsman, an
              artist, a marksman. Their weapon, their brush, their
              instrument &mdash; it&apos;s a piece of them. It extends what
              they can do. It makes them faster, sharper, more dangerous.
              But without the craftsman, the tool is nothing. It just sits
              there.
            </p>
            <p>
              That&apos;s AI. It makes me better. It makes me faster. It
              lets me operate as a one-man team that moves like a squad.
              But it&apos;s not doing the thinking. I am. The decade of
              pattern recognition, the instinct for what&apos;s actually
              broken, the ability to look at a business and know where
              it&apos;s bleeding &mdash; that&apos;s me. AI just took the
              ceiling off.
            </p>
            <p>
              We give AI a lot of credit right now. Skynet jokes, Ultron
              references &mdash; I&apos;ve made them all and I&apos;ll keep
              making them. But these systems aren&apos;t that. If they
              were, everyone screaming about AI would already be overnight
              billionaires. They&apos;re not. Because the tool doesn&apos;t
              work without the craftsman.
            </p>
          </div>

          <Divider />

          {/* The Soft Open */}
          <SectionHeading>The Soft Open</SectionHeading>
          <div className="space-y-5 text-lg leading-8 text-muted-foreground">
            <p>Here&apos;s the part I keep coming back to.</p>
            <p>
              A handful of like-minded, goal-oriented people with enough
              tokens could topple industries. Not in ten years. Not once AI
              &ldquo;matures.&rdquo; Right now.
            </p>
            <p>
              The entrance to the lobby has been unlocked. We&apos;re in a
              soft open. If you&apos;re paying attention, you can just walk
              in &mdash; past the velvet rope, past the people still
              arguing about whether the restaurant is real.
            </p>
            <p className="text-foreground font-medium">
              Is it a commodity? Is it a wand? Both. And the difference
              comes down to who&apos;s holding it and how fast they move
              while the door is still open.
            </p>
          </div>

          <Divider />

          {/* Who I Work With */}
          <SectionHeading>Who I Work With</SectionHeading>
          <div className="space-y-5 text-lg leading-8 text-muted-foreground">
            <p>
              I&apos;m most useful to companies and leaders who already
              know AI matters and just need someone to get them there.
              People who know they&apos;re a little behind, know they need
              to catch up, and want a partner who can move from &ldquo;here&apos;s
              the idea&rdquo; to &ldquo;here&apos;s the working version&rdquo;
              without a month of discovery.
            </p>
            <p>
              If you&apos;re still weighing whether AI is real or worth
              investing in, I&apos;m probably not the right fit &mdash; not
              because the question isn&apos;t fair, but because that&apos;s
              a conversation you need to have internally before you bring
              in a builder.
            </p>
            <p className="text-foreground font-medium">
              If you&apos;ve already had that conversation and you&apos;re
              ready to build something that actually runs in production,
              I can get you there.
            </p>
          </div>

          {/* Footer identity strip */}
          <p className="mt-20 pt-10 border-t text-center text-xs font-mono tracking-widest uppercase text-muted-foreground">
            Ranger Ventures LLC &middot; Kansas City, MO &middot; Remote
          </p>
        </div>
      </Container>
    </section>
  )
}
