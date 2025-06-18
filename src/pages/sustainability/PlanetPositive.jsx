import React from 'react';
import { motion } from 'framer-motion';
import { Globe, TrendingUp, Trees, ArrowLeft, Droplets } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const positiveImpacts = [
  { title: 'Carbon Sequestration', description: 'Investing in projects that remove more carbon from the atmosphere than we emit.', icon: Trees, imageAlt: 'Dense forest with sunlight filtering through, symbolizing carbon sequestration' },
  { title: 'Biodiversity Restoration', description: 'Supporting initiatives that protect and restore natural habitats and wildlife.', icon: Globe, imageAlt: 'Diverse ecosystem with various plants and animals' },
  { title: 'Water Replenishment', description: 'Working to replenish more freshwater than we consume in water-stressed regions.', icon: Droplets, imageAlt: 'Clean water flowing in a river through a lush landscape' },
  { title: 'Regenerative Agriculture', description: 'Promoting farming practices that improve soil health, biodiversity, and sequester carbon.', icon: TrendingUp, imageAlt: 'Healthy crops growing in rich, dark soil' },
];

const PlanetPositive = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link to="/sustainability">
            <Button variant="outline" className="text-indigo-700 border-indigo-700 hover:bg-indigo-100">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Sustainability
            </Button>
          </Link>
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-6 mb-16"
        >
          <Globe className="w-20 h-20 text-indigo-600 mx-auto float-animation" />
          <h1 className="text-5xl font-bold text-gray-900">Planet Positive: Our Vision</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Beyond sustainability, we aim to be Planet Positive. This means going further than minimizing harm—we strive to actively regenerate ecosystems and create a net positive impact on the Earth.
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-16"
        >
          <Card className="leaf-shadow border-indigo-200">
            <CardHeader>
              <CardTitle className="text-3xl text-indigo-800 text-center">Giving Back More Than We Take</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Becoming Planet Positive is our most ambitious goal. It involves a holistic approach that encompasses carbon neutrality (and beyond), biodiversity enhancement, water stewardship, and supporting regenerative practices throughout our value chain. We believe businesses have a crucial role to play in healing our planet.
              </p>
              <div className="aspect-w-16 aspect-h-9 my-6">
                <img  className="rounded-lg object-cover" alt="A vibrant coral reef teeming with marine life" src="https://images.unsplash.com/photo-1581353294203-4e136a002964?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGxhbmV0JTIwcG9zaXRpdmV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60" />
              </div>
              <p>
                Our journey to Planet Positive involves measuring our impact, setting ambitious targets, investing in nature-based solutions, and fostering collaborations that amplify positive change. This is not just a corporate responsibility; it's our legacy.
              </p>
            </CardContent>
          </Card>
        </motion.section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {positiveImpacts.map((impact, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full leaf-shadow border-indigo-200 overflow-hidden">
                <div className="h-48">
                  <img  className="w-full h-full object-cover" alt={impact.imageAlt} src={`https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=${80 + index}`} />
                </div>
                <CardHeader className="items-center text-center pt-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mb-3 mx-auto">
                    <impact.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl text-gray-800">{impact.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center leading-relaxed">{impact.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlanetPositive;