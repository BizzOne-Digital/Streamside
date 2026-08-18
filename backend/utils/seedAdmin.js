const User = require('../models/User');
const Service = require('../models/Service');
const Testimonial = require('../models/Testimonial');

const seedAdmin = async () => {
  try {
    const exists = await User.findOne({ email: process.env.ADMIN_EMAIL || 'admin@streamsidebookkeeping.ca' });
    if (!exists) {
      await User.create({
        name: 'Wendy Stevens',
        email: process.env.ADMIN_EMAIL || 'admin@streamsidebookkeeping.ca',
        password: process.env.ADMIN_PASSWORD || 'Admin@Streamside2026',
        role: 'admin'
      });
      console.log('✅ Admin user created');
    }

    const serviceCount = await Service.countDocuments();
    if (serviceCount === 0) {
      await Service.insertMany([
        {
          name: 'Essentials',
          tagline: 'Feel confident your books are taken care of.',
          price: '$345',
          priceNote: '/month + applicable taxes',
          type: 'plan',
          order: 1,
          features: [
            'Monthly bookkeeping',
            'Bank & credit card reconciliations',
            'Financial reports',
            'GST/PST tracking',
            'Year-end accountant-ready records'
          ],
          description: 'For smaller businesses that want to hand off the monthly bookkeeping and stop worrying about whether everything is current.'
        },
        {
          name: 'Growth',
          tagline: 'Stay on top of the numbers as your business grows.',
          price: '$545',
          priceNote: '/month + applicable taxes',
          badge: 'MOST POPULAR',
          featured: true,
          type: 'plan',
          order: 2,
          features: [
            'Everything in Essentials',
            'GST/PST filing',
            'A/R tracking',
            'A/P tracking',
            'Enhanced monthly reporting',
            'Accountant coordination',
            'Monthly check-in'
          ],
          description: 'For busy business owners who have more transactions, bills and customers—and need more ongoing support.'
        },
        {
          name: 'Complete',
          tagline: 'Hand over the bookkeeping and focus on running your business.',
          price: '$745',
          priceNote: '/month + applicable taxes',
          type: 'plan',
          order: 3,
          features: [
            'Everything in Growth',
            'Full-cycle bookkeeping',
            'Payroll',
            'A/P and A/R management',
            'Invoicing support',
            'Government reporting',
            'Year-end payroll reporting',
            'Monthly financial review'
          ],
          description: 'For established businesses that are ready to stop doing most of the bookkeeping themselves.'
        },
        {
          name: 'Books Rescue & Rebuild',
          tagline: 'Behind on your books? We\'ll help get them flowing again.',
          price: '$195–$295',
          priceNote: 'diagnostic review',
          type: 'rescue',
          order: 4,
          features: [
            'Review & assessment',
            'Clean-up plan creation',
            'Catch-up bookkeeping',
            'Rebuild accurate records',
            'Action plan & next steps',
            'Diagnostic fee credited toward clean-up'
          ],
          description: 'We review where things stand, create a clean-up plan and get your books current so you can move forward with confidence.',
          ctaText: 'Book a Books Rescue Review'
        }
      ]);
      console.log('✅ Services seeded');
    }

    const testCount = await Testimonial.countDocuments();
    if (testCount === 0) {
      await Testimonial.insertMany([
        {
          name: 'Mike R.',
          businessName: 'Island Excavation Ltd.',
          businessType: 'Excavation & Landscaping',
          location: 'Nanaimo, BC',
          quote: "Before Streamside, I was spending my evenings trying to figure out QuickBooks. Now I actually get to relax after work. Wendy keeps everything organized and I always know where my business stands.",
          rating: 5,
          featured: true,
          order: 1
        },
        {
          name: 'Sarah L.',
          businessName: 'Pacific Coast Painting',
          businessType: 'Painting Contractor',
          location: 'Victoria, BC',
          quote: "I came to Wendy with two years of messy books and was embarrassed about the state they were in. She never made me feel judged—just got to work and cleaned everything up. Highly recommend.",
          rating: 5,
          featured: true,
          order: 2
        },
        {
          name: 'Dave K.',
          businessName: 'Coastal Property Services',
          businessType: 'Property Maintenance',
          location: 'Courtenay, BC',
          quote: "Streamside Bookkeeping takes care of everything—payroll, GST filings, monthly reports. I spend my time on the business, not the books. Best investment I've made.",
          rating: 5,
          featured: true,
          order: 3
        }
      ]);
      console.log('✅ Testimonials seeded');
    }
  } catch (err) {
    console.error('Seed error:', err.message);
  }
};

module.exports = seedAdmin;
