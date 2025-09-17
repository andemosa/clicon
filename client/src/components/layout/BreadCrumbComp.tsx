import { Box, Breadcrumb, HStack, chakra } from "@chakra-ui/react";
import { Fragment } from "react";
import { Link as RouterLink } from "@tanstack/react-router";

import type { Crumb } from "./constants";

const Link = chakra(RouterLink);

interface CliconBreadcrumbProps {
  items: Crumb[];
}

const BreadCrumbComp = ({ items = [] }: CliconBreadcrumbProps) => {
  return (
    <Box w="full" bg="gray.50" display={{ base: "none", sm: "block" }}>
      <Breadcrumb.Root
        px={{ base: 6, lg: 12 }}
        py={{ base: 4 }}
        maxW={{ base: "full", xl: "1440px" }}
        mx="auto"
      >
        <Breadcrumb.List>
          {items.map((item, idx) => (
            <Fragment key={idx}>
              <Breadcrumb.Item>
                {item.isCurrent ? (
                  <Breadcrumb.CurrentLink
                    _focus={{ boxShadow: "none", outline: "none" }}
                  >
                    <HStack gap={1}>
                      {item.icon}
                      <Box as="span">{item.label}</Box>
                    </HStack>
                  </Breadcrumb.CurrentLink>
                ) : (
                  <Link
                    href={item.href}
                    _focus={{ boxShadow: "none", outline: "none" }}
                  >
                    <HStack gap={1}>
                      {item.icon}
                      <Box as="span">{item.label}</Box>
                    </HStack>
                  </Link>
                )}
              </Breadcrumb.Item>
              {idx < items.length - 1 && <Breadcrumb.Separator />}
            </Fragment>
          ))}
        </Breadcrumb.List>
      </Breadcrumb.Root>
    </Box>
  );
};

export default BreadCrumbComp;
