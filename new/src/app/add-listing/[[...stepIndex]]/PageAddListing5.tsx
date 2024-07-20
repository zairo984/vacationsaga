"use client";
import React, { FC, useEffect, useState } from "react";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Input from "@/shared/Input";

export interface PageAddListing5Props {}

interface Page5State {
  smoking: string;
  pet: string;
  party: string;
  cooking: string;
  additionalRules: string[];
}

const PageAddListing5: FC<PageAddListing5Props> = () => {
  const handleRadioChange = (name: string, value: string) => {
    setPage5((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleRulesAdd = () => {
    if (rulesInput) {
      setAdditionalRules((prev) => [...prev, rulesInput]);
      setRulesInput("");
    }
    setPage5((prev) => {
      return {
        ...prev,
        additionalRules: [...prev.additionalRules, rulesInput],
      }
    })
  };

  const [additionalRules, setAdditionalRules] = useState<string[]>(() => {
    const savedPage = localStorage.getItem("page5") || "";
    if (!savedPage) {
      return ["No smoking in common areas", "Do not wear shoes/shoes in the house", "No cooking in the bedroom"];
    }
    const value = JSON.parse(savedPage)["additionalRules"];
    return (
      value || [
        "No smoking in common areas",
        "Do not wear shoes/shoes in the house",
        "No cooking in the bedroom",
      ]
    );
  });

  const [rulesInput, setRulesInput] = useState<string>("");

  const [page5, setPage5] = useState<Page5State>(() => {
    const savedPage = localStorage.getItem("page5");
    return savedPage
      ? JSON.parse(savedPage)
      : {
          smoking: "Do not allow",
          pet: "Allow",
          party: "Allow",
          cooking: "Allow",
          additionalRules: additionalRules
        };
  });

  useEffect(() => {
    const newPage5 : Page5State = {
      smoking: page5.smoking,
      pet: page5.pet,
      party: page5.party,
      cooking: page5.cooking,
      additionalRules: additionalRules
    }
    // setPage5(newPage5);
    localStorage.setItem("page5", JSON.stringify(newPage5));
  }, [page5, additionalRules]);

  const renderRadio = (
    name: keyof Page5State,
    value: string,
    label: string,
    defaultChecked?: boolean
  ) => {
    return (
      <div className="flex items-center">
        <input
          // defaultChecked={defaultChecked}
          id={`${name}-${value}`}
          name={name}
          type="radio"
          className="focus:ring-primary-500 h-6 w-6 text-primary-500 border-neutral-300 !checked:bg-primary-500 bg-transparent"
          checked={page5[name] === value}
          onChange={() => handleRadioChange(name, value)}
        />
        <label
          htmlFor={`${name}-${value}`}
          className="ml-3 block text-sm font-medium text-neutral-700 dark:text-neutral-300"
        >
          {label}
        </label>
      </div>
    );
  };

  return (
    <>
      <div>
        <h2 className="text-2xl font-semibold">
          Set house rules for your guests{" "}
        </h2>
        <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
          Guests must agree to your house rules before they book.
        </span>
      </div>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      {/* FORM */}
      <div className="space-y-8">
        {/* ITEM */}
        <div>
          <label className="text-lg font-semibold" htmlFor="">
            Smoking
          </label>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {renderRadio("smoking", "Do not allow", "Do not allow", true)}
            {renderRadio("smoking", "Allow", "Allow")}
            {renderRadio("smoking", "Charge", "Charge")}
          </div>
        </div>

        {/* ITEM */}
        <div>
          <label className="text-lg font-semibold" htmlFor="">
            Pet
          </label>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {renderRadio("pet", "Do not allow", "Do not allow")}
            {renderRadio("pet", "Allow", "Allow", true)}
            {renderRadio("pet", "Charge", "Charge")}
          </div>
        </div>

        {/* ITEM */}
        <div>
          <label className="text-lg font-semibold" htmlFor="">
            Party organizing
          </label>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {renderRadio("party", "Do not allow", "Do not allow")}
            {renderRadio("party", "Allow", "Allow", true)}
            {renderRadio("party", "Charge", "Charge")}
          </div>
        </div>

        {/* ITEM */}
        <div>
          <label className="text-lg font-semibold" htmlFor="">
            Cooking
          </label>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {renderRadio("cooking", "Do not allow", "Do not allow")}
            {renderRadio("cooking", "Allow", "Allow", true)}
            {renderRadio("cooking", "Charge", "Charge")}
          </div>
        </div>

        {/* ----------- */}
        <div className=" border-b border-neutral-200 dark:border-neutral-700"></div>
        <span className="block text-lg font-semibold">Additional rules</span>
        <div className="flow-root">
          <div className="-my-3 divide-y divide-neutral-100 dark:divide-neutral-800">
            {/* {renderNoInclude("No smoking in common areas")}
            {renderNoInclude("Do not wear shoes/shoes in the house")}
            {renderNoInclude("No cooking in the bedroom")} */}
            {additionalRules.map((item, index) => (
              <div
                className="py-3 flex items-center justify-between"
                key={index}
              >
                <div className="flex items-center">
                  <span className="ml-3 text-neutral-700 dark:text-neutral-300">
                    {item}
                  </span>
                </div>
                <i
                  className="text-2xl text-neutral-400 las la-times-circle hover:text-neutral-900 dark:hover:text-neutral-100 cursor-pointer"
                  onClick={() =>
                    setAdditionalRules((prev) => { return [
                      ...additionalRules.slice(0, index),
                      ...additionalRules.slice(
                        index + 1,
                        additionalRules.length
                      ),
                    ]})
                  }
                ></i>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between space-y-3 sm:space-y-0 sm:space-x-5">
          <Input
            className="!h-full"
            placeholder="No smoking..."
            value={rulesInput}
            onChange={(e) => setRulesInput(e.target.value)}
          />
          <ButtonPrimary
            className="flex-shrink-0"
            // onClick={() => {setAdditionalRules([...additionalRules, rulesInput]); setRulesInput(""); handleRulesAdd();}}
            onClick={() => handleRulesAdd()}
          >
            <i className="text-xl las la-plus"></i>
            <span className="ml-3">Add tag</span>
          </ButtonPrimary>
        </div>
      </div>
    </>
  );
};

export default PageAddListing5;
