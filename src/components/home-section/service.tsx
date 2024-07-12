import Image from "next/image";
import React from "react";

const Service = () => {
  return (
    <div className="flex flex-col items-center w-full py-10 text-justify bg-custom-green text-custom-nav">
      <div className="text-4xl font-semibold">Our Services</div>
      <div className="grid grid-cols-2 w-[1300px] place-items-center h-[400px]">
        <div>
          <div className="text-xl font-semibold pb-3">
            Housekeeping (Maid Services)
          </div>
          <div className="w-[500px]">
            Keep your home clean and organized with our professional
            housekeeping services. Our dedicated maids will ensure every corner
            of your home shines, so you can enjoy a tidy and comfortable living
            space.
          </div>
        </div>
        <Image
          src="/maid.png"
          alt="maid"
          width={400}
          height={400}
          className="rounded-md shadow-md ml-12"
        />
      </div>
      <div className="grid grid-cols-2 w-[1300px] place-items-center">
        <Image
          src="/childcare.png"
          alt="maid"
          width={400}
          height={400}
          className="rounded-md shadow-md mr-12"
        />
        <div>
          <div>
            <div className="text-xl font-semibold pb-3">Childcare</div>
            <div className="w-[500px]">
              Entrust your little ones to our experienced caregivers who provide
              attentive and nurturing childcare services. Whether you need
              occasional babysitting or regular childcare assistance, we have
              the perfect caregiver for your family.
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 w-[1300px] place-items-center">
        <div>
          <div>
            <div className="text-xl font-semibold pb-3">Senior Care</div>
            <div className="w-[500px]">
              Ensure the well-being and happiness of your elderly loved ones
              with our specialized senior care services. Our compassionate
              caregivers offer companionship, assistance with daily tasks, and
              personalized care to support the independence and dignity of
              seniors.
            </div>
          </div>
        </div>
        <Image
          src="/seniorcare.png"
          alt="maid"
          width={400}
          height={400}
          className="rounded-md shadow-md ml-12"
        />
      </div>
    </div>
  );
};

export default Service;
