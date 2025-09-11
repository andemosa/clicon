import { Flex, Steps } from "@chakra-ui/react";
import { Check, BookText, Package, Truck, Handshake } from "lucide-react";
import { useState } from "react";

const StepsComp = () => {
  const [activeStep, setActiveStep] = useState(2);
  return (
    <Steps.Root
      step={activeStep}
      onStepChange={(e) => setActiveStep(e.step)}
      count={steps.length}
      size="sm"
      pb={100}
      w={'80%'}
      mx={'auto'}
    >
      <Steps.List>
        {steps.map((step, index) => (
          <Steps.Item key={index} index={index} position={"relative"} gap={0}>
            <Steps.Indicator bgColor={index < activeStep ? "orange.500" : "white"} borderColor={'orange.500'}>
              <Steps.Status incomplete={null} complete={<Check />} />
            </Steps.Indicator>
            <Steps.Separator />
            <Flex
              direction={"column"}
              align={"center"}
              position={"absolute"}
              left={-4}
              bottom={-20}
              gap={4}
              opacity={index < activeStep ? 1 : "0.5"}
            >
              <Steps.Title color={index < activeStep ? "green.500" : "orange.500"}>{step.icon}</Steps.Title>
              <Steps.Description color={'gray.900'}>{step.description}</Steps.Description>
            </Flex>
          </Steps.Item>
        ))}
      </Steps.List>
    </Steps.Root>
  );
};

export default StepsComp;

const steps = [
  {
    icon: <BookText />,
    description: "Order Placed",
  },
  {
    icon: <Package />,
    description: "Packaging",
  },
  {
    icon: <Truck />,
    description: "On the Road",
  },
  {
    icon: <Handshake />,
    description: "Delivered",
  },
];
