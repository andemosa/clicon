import { HStack, RadioGroup } from "@chakra-ui/react";
import { useState } from "react";

const items = [
  { label: "Option 1", value: "1" },
  { label: "Option 2", value: "2" },
  { label: "Option 3", value: "3" },
];

const RadioComp = () => {
  const [value, setValue] = useState<string | null>(null);
  return (
    <RadioGroup.Root value={value} onValueChange={(e) => setValue(e.value)} variant={'subtle'}>
      <HStack gap="6">
        {items.map((item) => (
          <RadioGroup.Item key={item.value} value={item.value}>
            <RadioGroup.ItemHiddenInput />
            <RadioGroup.ItemIndicator />
            <RadioGroup.ItemText>{item.label}</RadioGroup.ItemText>
          </RadioGroup.Item>
        ))}
      </HStack>
    </RadioGroup.Root>
  );
};

export default RadioComp;
