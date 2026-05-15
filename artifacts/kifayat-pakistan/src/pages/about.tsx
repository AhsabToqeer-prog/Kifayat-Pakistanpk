import { Heart, Users, Scale } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6">About Kifayat</h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            A dignified, community-driven NGO platform advocating for ordinary Pakistanis.
          </p>
        </div>
      </div>

      {/* Story */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-8 text-center" id="mission">Our Story</h2>
          <div className="prose prose-lg mx-auto text-muted-foreground prose-headings:font-serif prose-headings:text-foreground">
            <p>
              Kifayat was born out of a simple observation on the streets of Pakistan: the individuals working the hardest were the ones struggling the most to survive. The street vendor pushing a cart for twelve hours, the small shopkeeper overwhelmed by electricity bills, the daily wage laborer waiting at the chowk.
            </p>
            <p>
              We realized that the problem wasn't a lack of effort, but a lack of systemic support and collective bargaining power. The concept of <strong>"Melting Profit"</strong> became our guiding principle. In a traditional corporate model, profit crystallizes at the top. In our model, profit and resources melt downwards, nourishing the roots of the community.
            </p>
            <p>
              When a community pools small contributions—whether it's knowledge, time, or capital—the collective benefit far outweighs the sum of its parts. Kifayat exists to facilitate this pooling.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Our Core Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6 bg-background rounded-sm shadow-sm border" data-testid="value-brotherhood">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold mb-4">Brotherhood</h3>
              <p className="text-muted-foreground">
                We believe in the fundamental dignity of every worker. Our organization operates on mutual respect and shared struggle, not charity from above.
              </p>
            </div>

            <div className="text-center p-6 bg-background rounded-sm shadow-sm border" data-testid="value-equality">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
                <Scale className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold mb-4">Equality</h3>
              <p className="text-muted-foreground">
                Advocating for fair policies that give small businesses and vendors the same legal protections and opportunities as larger corporations.
              </p>
            </div>

            <div className="text-center p-6 bg-background rounded-sm shadow-sm border" data-testid="value-responsibility">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold mb-4">Responsibility</h3>
              <p className="text-muted-foreground">
                We are accountable to the communities we serve. Every initiative is grounded in real needs communicated by the workers themselves.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
