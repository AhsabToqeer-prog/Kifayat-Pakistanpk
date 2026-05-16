import { Heart, Users, Scale } from "lucide-react";
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

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-primary text-primary-foreground py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-secondary/10 transform rotate-3 scale-150 origin-top-right mix-blend-overlay"></div>
        <motion.div 
          className="container relative z-10 mx-auto px-4 max-w-4xl text-center"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeIn} className="inline-flex items-center rounded-full border border-secondary bg-secondary/20 px-3 py-1 text-sm font-medium text-secondary-container mb-6">
            Our Mission
          </motion.div>
          <motion.h1 variants={fadeIn} className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6">About Kifayat</motion.h1>
          <motion.p variants={fadeIn} className="text-xl text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed">
            A dignified, community-driven NGO platform advocating for social awareness and empowering ordinary Pakistanis.
          </motion.p>
        </motion.div>
      </section>

      {/* Story */}
      <section className="py-24 md:py-32">
        <motion.div 
          className="container mx-auto px-4 max-w-3xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold text-primary mb-12 text-center" id="mission">
            Our Story
          </motion.h2>
          <motion.div variants={fadeIn} className="prose prose-lg mx-auto text-muted-foreground prose-headings:font-serif prose-p:leading-relaxed prose-strong:text-primary">
            <p>
              Kifayat was born out of a simple observation on the streets of Pakistan: the individuals working the hardest were often the ones struggling the most to survive. The street vendor pushing a cart for twelve hours, the small shopkeeper overwhelmed by electricity bills, the daily wage laborer waiting at the chowk.
            </p>
            <p>
              We realized that the problem wasn't a lack of effort, but a lack of systemic support and collective bargaining power. The concept of <strong>"Melting Profit"</strong> became our guiding principle. In a traditional corporate model, profit crystallizes at the top. In our model, profit and resources melt downwards, nourishing the roots of the community.
            </p>
            <p>
              When a community pools small contributions—whether it's knowledge, time, or capital—the collective benefit far outweighs the sum of its parts. Kifayat exists to facilitate this pooling.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Values */}
      <section className="py-24 md:py-32 bg-card relative">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/50 to-transparent"></div>
        <div className="container relative z-10 mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-16 text-center">Our Core Values</h2>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {[
              {
                icon: <Users className="w-8 h-8" />,
                title: "Brotherhood",
                desc: "We believe in the fundamental dignity of every worker. Our organization operates on mutual respect and shared struggle, not charity from above."
              },
              {
                icon: <Scale className="w-8 h-8" />,
                title: "Equality",
                desc: "Advocating for fair policies that give small businesses and vendors the same legal protections and opportunities as larger corporations."
              },
              {
                icon: <Heart className="w-8 h-8" />,
                title: "Responsibility",
                desc: "We are accountable to the communities we serve. Every initiative is grounded in real needs communicated by the workers themselves."
              }
            ].map((val, idx) => (
              <motion.div key={idx} variants={fadeIn} className="text-center p-8 bg-card rounded elevation-1 border border-border">
                <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center text-secondary mb-6">
                  {val.icon}
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4">{val.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {val.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
