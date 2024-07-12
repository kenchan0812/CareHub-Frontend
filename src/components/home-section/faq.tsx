import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Faq = () => {
  return (
    <div className="flex flex-col items-center pt-10 text-custom-action bg-custom-lighterGreen">
      <div className="text-4xl font-semibold my-10">
        Frequently Asked Questions
      </div>
      <Accordion type="single" collapsible className="w-[1200px]">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-lg">
            How do I find the right caregiver for my specific needs?
          </AccordionTrigger>
          <AccordionContent>
            Our platform simplifies the process of finding the perfect caregiver
            by allowing you to specify your requirements, such as experience
            level, availability, and specialized skills. You can browse through
            profiles, read reviews, and communicate directly with potential
            caregivers to ensure they meet your unique needs and preferences.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-lg">
            What qualifications and background checks do your caregivers
            undergo?
          </AccordionTrigger>
          <AccordionContent>
            We rigorously vet all caregivers on our platform to ensure they meet
            our high standards of professionalism and reliability. This includes
            thorough background checks, verification of certifications and
            qualifications, as well as interviews to assess their experience and
            compatibility with our client&apos;s needs. Your safety and peace of
            mind are our top priorities.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="text-lg">
            Can I arrange for occasional or temporary care, or is it only
            long-term commitments?
          </AccordionTrigger>
          <AccordionContent>
            Our platform caters to a variety of care needs, whether you require
            occasional, temporary, or long-term assistance. Whether you need a
            caregiver for a few hours a week, full-time care, or just an
            occasional helping hand, we offer flexible options to accommodate
            your schedule and preferences. Simply specify your requirements, and
            we&apos;ll match you with caregivers who can meet your needs on your
            terms.{" "}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Faq;
