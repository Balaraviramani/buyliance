
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const FAQsPage = () => {
  const faqs = [
    {
      question: "How long does shipping take?",
      answer: "Standard shipping typically takes 3-5 business days. Express shipping options are available at checkout for 1-2 business day delivery."
    },
    {
      question: "What is your return policy?",
      answer: "We accept returns within 30 days of purchase. Items must be in original condition with tags attached. Please visit our Returns page for more details."
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship to most countries worldwide. International shipping times vary by location, typically 7-14 business days."
    },
    {
      question: "How can I track my order?",
      answer: "You can track your order through your account or by using the order tracking tool on our website with your order number and email address."
    },
    {
      question: "Are my payment details secure?",
      answer: "Yes, we use industry-standard encryption and secure payment processors to ensure your payment information is always protected."
    },
    {
      question: "Can I change or cancel my order?",
      answer: "Orders can be modified or canceled within 1 hour of placement. Please contact customer service immediately if you need to make changes."
    },
    {
      question: "Do you offer gift wrapping?",
      answer: "Yes, gift wrapping is available for a small fee. You can select this option during checkout."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and bank transfers. Some regional payment methods are also available at checkout."
    }
  ];

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h1>
          
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          <div className="mt-12 p-6 bg-gray-50 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-center">Still have questions?</h2>
            <p className="text-center text-gray-600 mb-6">
              Our customer service team is here to help you with any questions or concerns.
            </p>
            <div className="flex justify-center">
              <a href="/contact">
                <Button>Contact Us</Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default FAQsPage;
