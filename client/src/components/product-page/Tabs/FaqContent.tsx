import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type FaqItem = {
  question: string;
  answer: string;
};

const faqsData: FaqItem[] = [
  {
    question: "Why is hemp sustainable?",
    answer: "Hemp requires minimal water, pesticides, and fertilizers, making it an eco-friendly alternative to other fabrics.",
  },
  {
    question: "Where are your products made?",
    answer: "All our products are carefully crafted in Nepal, ensuring ethical practices and supporting local artisans.",
  },
  {
    question: "How should I care for my hemp products?",
    answer: "To keep your hemp items in the best condition, hand wash with cold water and air dry.",
  },
  {
    question: "Are the products unisex or designed for specific genders?",
    answer: "Most of the products are Unisex whereas some are designed for specific genders which is mentioned in each product page.",
  },
];

const FaqContent = () => {
  return (
    <section>
      <h3 className="text-xl sm:text-2xl font-bold text-black mb-5 sm:mb-6">
        Frequently asked questions
      </h3>
      <Accordion type="single" collapsible>
        {faqsData.map((faq, idx) => (
          <AccordionItem key={idx} value={`item-${idx + 1}`}>
            <AccordionTrigger className="text-left">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default FaqContent;
