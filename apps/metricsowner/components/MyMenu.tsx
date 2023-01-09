import Link from "next/link";
import React from "react";

const IndicatorsMenu = () => {
  return (
    <>
      <ul>
        <li>
          <Link href={"/my/indicators"} className={"w-[100%] clear-both"}>
            Manage Indicators
          </Link>
        </li>
        <li>
          <Link href={"/my/indicators/add"} className={"w-[100%] clear-both"}>
            Add Indicator
          </Link>
        </li>
      </ul>
    </>
  );
};

const SchoolsMenu = () => {
  return (
    <>
      <ul>
        <li>
          <Link href={"/my/schools"} className={"w-[100%] clear-both"}>
            Manage Schools
          </Link>
        </li>
        <li>
          <Link href={"/my/schools/add"} className={"w-[100%] clear-both"}>
            Add School
          </Link>
        </li>
      </ul>
    </>
  );
};

const AccountsMenu = () => {
  return (
    <>
      <ul>
        <li>
          <Link href={"/my/accounts"} className={"w-[100%] clear-both"}>
            Manage Accounts
          </Link>
        </li>
        <li>
          <Link href={"/my/accounts/add"} className={"w-[100%] clear-both"}>
            Add Accounts
          </Link>
        </li>
      </ul>
    </>
  );
};

export {
  IndicatorsMenu,
  SchoolsMenu,
  AccountsMenu
};
