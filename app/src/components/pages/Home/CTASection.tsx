import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const CTASection = () => {
  return (
    <>
      {/* CTASection */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of professionals who have found their dream jobs through our platform.
          </p>
          <Link href="/register">
            <button className="bg-white text-blue-700 px-8 py-4 text-lg rounded-lg font-semibold hover:bg-gray-100 transition flex items-center justify-center mx-auto">
              Create Account <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default CTASection;
