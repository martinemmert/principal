import { Inter } from "next/font/google";
import SQLInputForm from "@/app/components/sql-input-form";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return <SQLInputForm />;
}
