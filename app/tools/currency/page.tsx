"use client";

import { useEffect, useState } from "react";
import Header from "@/app/components/Header";

export default function CurrencyPage() {
  const [from, setFrom] = useState(0);
  const [fromUnit, setFromUnit] = useState("AED");
  const [to, setTo] = useState(0);
  const [toUnit, setToUnit] = useState("AED");

  const currencies = ["AED", "AFN", "ALL", "AMD", "ANG", "AOA", "ARS", "AUD", "AWG", "AZN", "BAM", "BBD", "BDT", "BGN", "BHD", "BIF", "BMD", "BND", "BOB", "BRL", "BSD", "BTN", "BWP", "BYN", "BZD", "CAD", "CDF", "CHF", "CLP", "CNY", "COP", "CRC", "CUP", "CVE", "CZK", "DJF", "DKK", "DOP", "DZD", "EGP", "ERN", "ETB", "EUR", "FJD", "FKP", "FOK", "GBP", "GEL", "GGP", "GHS", "GIP", "GMD", "GNF", "GTQ", "GYD", "HKD", "HNL", "HRK", "HTG", "HUF", "IDR", "ILS", "IMP", "INR", "IQD", "IRR", "ISK", "JEP", "JMD", "JOD", "JPY", "KES", "KGS", "KHR", "KID", "KMF", "KRW", "KWD", "KYD", "KZT", "LAK", "LBP", "LKR", "LRD", "LSL", "LYD", "MAD", "MDL", "MGA", "MKD", "MMK", "MNT", "MOP", "MRU", "MUR", "MVR", "MWK", "MXN", "MYR", "MZN", "NAD", "NGN", "NIO", "NOK", "NPR", "NZD", "OMR", "PAB", "PEN", "PGK", "PHP", "PKR", "PLN", "PYG", "QAR", "RON", "RSD", "RUB", "RWF", "SAR", "SBD", "SCR", "SDG", "SEK", "SGD", "SHP", "SLE", "SLL", "SOS", "SPL", "SRD", "STN", "SYP", "SZL", "THB", "TJS", "TMT", "TND", "TOP", "TRY", "TTD", "TVD", "TWD", "TZS", "UAH", "UGX", "USD", "UYU", "UZS", "VES", "VND", "VUV", "WST", "XAF", "XCD", "XDR", "XOF", "XPF", "YER", "ZAR", "ZMW", "ZWL"];
  const currencyNames = ["United Arab Emirates Dirham", "Afghan Afghani", "Albanian Lek", "Armenian Dram", "Netherlands Antillean Guilder", "Angolan Kwanza", "Argentine Peso", "Australian Dollar", "Aruban Florin", "Azerbaijani Manat", "Bosnia-Herzegovina Convertible Mark", "Barbadian Dollar", "Bangladeshi Taka", "Bulgarian Lev", "Bahraini Dinar", "Burundian Franc", "Bermudan Dollar", "Brunei Dollar", "Bolivian Boliviano", "Brazilian Real", "Bahamian Dollar", "Bhutanese Ngultrum", "Botswanan Pula", "Belarusian Ruble", "Belize Dollar", "Canadian Dollar", "Congolese Franc", "Swiss Franc", "Chilean Peso", "Chinese Yuan", "Colombian Peso", "Costa Rican Colón", "Cuban Peso", "Cape Verdean Escudo", "Czech Koruna", "Djiboutian Franc", "Danish Krone", "Dominican Peso", "Algerian Dinar", "Egyptian Pound", "Eritrean Nakfa", "Ethiopian Birr", "Euro", "Fijian Dollar", "Falkland Islands Pound", "Faroese Króna", "British Pound Sterling", "Georgian Lari", "Guernsey Pound", "Ghanaian Cedi", "Gibraltar Pound", "Gambian Dalasi", "Guinean Franc", "Guatemalan Quetzal", "Guyanaese Dollar", "Hong Kong Dollar", "Honduran Lempira", "Croatian Kuna", "Haitian Gourde", "Hungarian Forint", "Indonesian Rupiah", "Israeli New Shekel", "Isle of Man Pound", "Indian Rupee", "Iraqi Dinar", "Iranian Rial", "Icelandic Króna", "Jersey Pound", "Jamaican Dollar", "Jordanian Dinar", "Japanese Yen", "Kenyan Shilling", "Kyrgystani Som", "Cambodian Riel", "Kiribati Dollar", "Comorian Franc", "South Korean Won", "Kuwaiti Dinar", "Cayman Islands Dollar", "Kazakhstani Tenge", "Laotian Kip", "Lebanese Pound", "Sri Lankan Rupee", "Liberian Dollar", "Lesotho Loti", "Libyan Dinar", "Moroccan Dirham", "Moldovan Leu", "Malagasy Ariary", "Macedonian Denar", "Myanmar Kyat", "Mongolian Tugrik", "Macanese Pataca", "Mauritanian Ouguiya", "Mauritian Rupee", "Maldivian Rufiyaa", "Malawian Kwacha", "Mexican Peso", "Malaysian Ringgit", "Mozambican Metical", "Namibian Dollar", "Nigerian Naira", "Nicaraguan Córdoba", "Norwegian Krone", "Nepalese Rupee", "New Zealand Dollar", "Omani Rial", "Panamanian Balboa", "Peruvian Sol", "Papua New Guinean Kina", "Philippine Peso", "Pakistani Rupee", "Polish Zloty", "Paraguayan Guarani", "Qatari Rial", "Romanian Leu", "Serbian Dinar", "Russian Ruble", "Rwandan Franc", "Saudi Riyal", "Solomon Islands Dollar", "Seychellois Rupee", "Sudanese Pound", "Swedish Krona", "Singapore Dollar", "Saint Helena Pound", "Sierra Leonean Leone", "Sierra Leonean Leone", "Somali Shilling", "Seborgan Luigino", "Surinamese Dollar", "São Tomé and Príncipe Dobra", "Syrian Pound", "Swazi Lilangeni", "Thai Baht", "Tajikistani Somoni", "Turkmenistani Manat", "Tunisian Dinar", "Tongan Paʻanga", "Turkish Lira", "Trinidad and Tobago Dollar", "Tuvaluan Dollar", "New Taiwan Dollar", "Tanzanian Shilling", "Ukrainian Hryvnia", "Ugandan Shilling", "United States Dollar", "Uruguayan Peso", "Uzbekistan Som", "Venezuelan Bolívar", "Vietnamese Dong", "Vanuatu Vatu", "Samoan Tala", "Central African CFA Franc", "East Caribbean Dollar", "Special Drawing Rights", "West African CFA Franc", "CFP Franc", "Yemeni Rial", "South African Rand", "Zambian Kwacha", "Zimbabwean Dollar"];

  async function handleConvert() {
    if (Number.isNaN(from)) {
      setTo(0);
      return;
    }
    const res = await fetch(`/api/currency?value=${from}&from=${fromUnit}&to=${toUnit}`);
    const json = await res.json();
    setTo(json.conversion_result);
  }

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 font-sans dark:bg-black p-4">
      <Header title="Currency Converter"/>
      <div>        
        <div>
          <h3 className="text-lg font-semibold">Convert from</h3>
          <input type="number" className="bg-zinc-900 m-1 p-2 rounded-md" onChange={(e) => {setFrom(Number.parseInt(e.target.value));}}/>
          <select className="bg-zinc-900 m-1 p-2 rounded-md" onChange={(e) => {setFromUnit(e.target.value);}}>
            {currencies.map((c, i) => (
              <option key={c} value={c}>{currencyNames[i]} - {c}</option>
            ))}
          </select>
          <h3 className="text-lg font-semibold">Convert to</h3>
          <input type="number" readOnly className="bg-zinc-900 m-1 p-2 rounded-md" value={to}/>
          <select className="bg-zinc-900 m-1 p-2 rounded-md" onChange={(e) => {setToUnit(e.target.value)}}>
            {currencies.map((c, i) => (
              <option key={c} value={c}>{currencyNames[i]} - {c}</option>
            ))}
          </select>
          <br/>
          <button
            className="bg-blue-600 p-2 m-1 rounded-md"
            onClick={handleConvert}
          >
            Convert
          </button>
        </div>
      </div>
    </div>
  )
}