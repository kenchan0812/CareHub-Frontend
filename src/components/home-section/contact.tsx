import React from "react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
const Contact = () => {
  return (
    <div
      className="py-12 md:py-24 bg-custom-lighterGreen text-custom-action"
      id="contact"
    >
      <div className="container px-4 md:px-6">
        <div className="grid gap-12 justify-center">
          <div className="space-y-4 w-[900px]">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl/none">
                Contact Us
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                Interested in joining our caregiving community? Reach out to our
                Support Team to learn more.
              </p>
            </div>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input
                    id="first-name"
                    placeholder="Enter your first name"
                    className="bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input
                    id="last-name"
                    placeholder="Enter your last name"
                    className="bg-white"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="Enter your email"
                  type="email"
                  className="bg-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  className="min-h-[150px] bg-white"
                  id="message"
                  placeholder="Enter your message"
                />
              </div>
              <Button
                size="lg"
                className="bg-custom-green hover:bg-custom-action"
              >
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
