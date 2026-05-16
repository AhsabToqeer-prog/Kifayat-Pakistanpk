import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, BookOpen, Heart, Users } from "lucide-react";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full min-h-[90vh] flex items-center bg-background overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-muted/50 -skew-x-12 translate-x-1/4 z-0"></div>
        <div className="container relative z-10 mx-auto px-4 lg:px-8 flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          <motion.div 
            className="flex-1 text-center lg:text-left mt-16 lg:mt-0"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeIn} className="inline-flex items-center rounded-full border border-secondary/20 bg-secondary/10 px-3 py-1 text-sm font-medium text-secondary mb-6">
              <span className="flex h-2 w-2 rounded-full bg-secondary mr-2"></span>
              Social Awareness & Education
            </motion.div>
            <motion.h1 variants={fadeIn} className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary mb-6 leading-[1.1]">
              Impactful Change for a <span className="text-secondary">Better Pakistan.</span>
            </motion.h1>
            <motion.p variants={fadeIn} className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              We are dedicated to fostering social awareness and education, empowering communities with the knowledge and resources to thrive.
            </motion.p>
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Button asChild size="lg" className="w-full sm:w-auto px-8 h-14 rounded bg-primary text-primary-foreground hover:bg-primary/90 text-lg">
                <Link href="/about">Learn More</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto px-8 h-14 rounded border-border text-foreground hover:bg-muted text-lg">
                <Link href="/programs">Our Programs</Link>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div 
            className="flex-1 w-full max-w-lg lg:max-w-none relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl elevation-2 aspect-[4/3] lg:aspect-square w-full">
              <img 
                src="/images/hero.png" 
                alt="Diverse people collaborating in a professional setting" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
            </div>
            
            {/* Floating Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="absolute -bottom-6 -left-6 bg-card elevation-1 p-6 rounded-lg max-w-[240px] hidden md:block"
            >
              <div className="flex items-center gap-4 mb-2">
                <div className="bg-secondary/10 p-3 rounded-full text-secondary">
                  <Heart className="w-6 h-6" />
                </div>
                <div className="font-serif font-bold text-2xl text-primary">10k+</div>
              </div>
              <p className="text-sm text-muted-foreground font-medium">Lives impacted through our awareness campaigns.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-24 bg-card relative">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">Building Institutional Trust</h2>
            <p className="text-lg text-muted-foreground">
              By blending functional elegance and structural precision, we prioritize clarity of information to let our social mission remain the focal point.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {[
              {
                icon: <BookOpen className="w-8 h-8" />,
                title: "Education",
                description: "Delivering crucial educational resources to underrepresented communities, fostering a culture of lifelong learning."
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Community",
                description: "Building strong, united communities through collaborative workshops and civic engagement initiatives."
              },
              {
                icon: <Heart className="w-8 h-8" />,
                title: "Social Progress",
                description: "Advocating for fundamental rights and well-being, prioritizing the most vulnerable populations."
              }
            ].map((item, i) => (
              <motion.div key={i} variants={fadeIn}>
                <Card className="h-full border-border bg-card hover:elevation-2 transition-shadow duration-300 rounded p-4">
                  <CardContent className="pt-6">
                    <div className="w-16 h-16 bg-muted rounded flex items-center justify-center text-secondary mb-8">
                      {item.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-primary mb-4">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-primary-foreground/5 transform -skew-y-3 origin-top-left"></div>
        <div className="container relative z-10 mx-auto px-4 text-center max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeIn} className="text-4xl md:text-6xl font-bold mb-8 text-primary-foreground">
              Join Us in Making a Difference
            </motion.h2>
            <motion.p variants={fadeIn} className="text-xl md:text-2xl text-primary-foreground/80 mb-12 font-serif italic max-w-3xl mx-auto">
              "We believe in an economy and society where every individual has access to knowledge and opportunity."
            </motion.p>
            <motion.div variants={fadeIn}>
              <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-10 py-7 text-xl rounded">
                <Link href="/programs">
                  Explore Our Programs <ArrowRight className="ml-2 w-6 h-6" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
