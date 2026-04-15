import { Tabs } from "@vapor-ui/core";

import type { ComponentType } from "react";

type ListItem = {
  value: string;
  title: string;
  page: ComponentType<{ recipient: string; email: string; phone: string }>;
};

type TabProps = {
  listItem?: ListItem[];
  defaultValue?: string;
  recipient: string;
  email: string;
  phone: string;
};

export default function Tab({
  listItem = [],
  defaultValue,
  recipient,
  email,
  phone,
}: TabProps) {
  return (
    <Tabs.Root
      defaultValue={defaultValue}
      variant="line"
      className="w-full gap-10"
    >
      <Tabs.List
        className="w-full border-b-2 border-gray-90"
        indicatorElement={
          <Tabs.IndicatorPrimitive className="bg-primary-500" />
        }
      >
        <div className="flex w-10/12 gap-4 mx-auto">
          {listItem.map((item) => (
            <Tabs.Button
              key={item.value}
              value={item.value}
              className={(state) =>
                `text-body3 w-fit px-1 ${state.active ? "text-primary-500" : "text-gray-400"}`
              }
            >
              {item.title}
            </Tabs.Button>
          ))}
        </div>
      </Tabs.List>

      {listItem.map((item) => (
        <Tabs.Panel
          key={item.value}
          value={item.value}
          className="flex items-center justify-center"
        >
          <item.page recipient={recipient} email={email} phone={phone} />
        </Tabs.Panel>
      ))}
    </Tabs.Root>
  );
}
