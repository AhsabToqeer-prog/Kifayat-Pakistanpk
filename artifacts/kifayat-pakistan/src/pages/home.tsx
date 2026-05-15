import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Store, ShoppingBag, HardHat } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-background py-16 md:py-24 lg:py-32 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
          <span className="text-accent font-semibold tracking-wider uppercase text-sm mb-4 inline-block animate-in fade-in slide-in-from-bottom-4 duration-500">
            Melting Profit for Collective Benefit
          </span>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-foreground max-w-4xl mb-6 leading-tight animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            Dignity for the working hands of Pakistan.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            When a community pools small contributions, profit "melts" into collective benefit. We advocate for small shopkeepers, street vendors, and laborers to build a fairer economy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-sm" data-testid="btn-hero-donate">
              <Link href="/contact">Donate Now</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-8 py-6 text-lg rounded-sm border-2" data-testid="btn-hero-volunteer">
              <Link href="/contact">Become a Volunteer</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
          <p className="text-xl md:text-2xl leading-relaxed text-primary-foreground/90 font-serif italic">
            "To transform the struggle of isolated workers into the strength of a united community. We believe in an economy where the smallest vendor has the largest voice."
          </p>
        </div>
      </section>

      {/* Beneficiaries */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">Who We Serve</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We focus on the backbone of Pakistan's informal economy—those who work the hardest yet remain the most vulnerable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow bg-background" data-testid="card-shopkeepers">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-accent mb-4">
                  <Store className="w-6 h-6" />
                </div>
                <CardTitle className="font-serif text-2xl">Small Shopkeepers</CardTitle>
                <CardDescription className="text-base">Retailers facing rising costs and utility bills.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  We provide solar schemes to mitigate electricity costs and assist in forming cooperative purchasing groups to negotiate better rates with wholesalers.
                </p>
                <Link href="/resources?category=shopkeepers" className="text-accent font-semibold inline-flex items-center hover:underline">
                  View Resources <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md hover:shadow-lg transition-shadow bg-background" data-testid="card-vendors">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-accent mb-4">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <CardTitle className="font-serif text-2xl">Street Vendors</CardTitle>
                <CardDescription className="text-base">Mobile merchants dealing with daily harassment.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  We advocate for formalized vendor licensing and safe vending zones to protect micro-entrepreneurs from arbitrary eviction and extortion.
                </p>
                <Link href="/resources?category=vendors" className="text-accent font-semibold inline-flex items-center hover:underline">
                  View Resources <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md hover:shadow-lg transition-shadow bg-background" data-testid="card-laborers">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-accent mb-4">
                  <HardHat className="w-6 h-6" />
                </div>
                <CardTitle className="font-serif text-2xl">Daily Wage Laborers</CardTitle>
                <CardDescription className="text-base">Workers with no financial safety net.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  We facilitate access to emergency funds, basic health coverage, and legal aid for wage disputes to ensure dignified working conditions.
                </p>
                <Link href="/resources?category=laborers" className="text-accent font-semibold inline-flex items-center hover:underline">
                  View Resources <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-accent text-accent-foreground relative">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6">Stand with the Builders of Pakistan</h2>
          <p className="text-lg md:text-xl mb-10 text-accent-foreground/90">
            Whether you can give your time, your voice, or your resources, your contribution helps build a more equitable society.
          </p>
          <Button asChild size="lg" className="bg-background text-foreground hover:bg-background/90 px-10 py-6 text-lg rounded-sm" data-testid="btn-cta-contact">
            <Link href="/contact">Join the Movement</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
