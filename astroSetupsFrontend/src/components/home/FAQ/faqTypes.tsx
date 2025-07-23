import { JSX } from "react";

export interface FAQProps {
  id?: string;
}

export interface FAQItem {
  id: number;
  question: string;
  answer: JSX.Element;
}