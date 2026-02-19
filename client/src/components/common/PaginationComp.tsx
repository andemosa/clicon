import { ButtonGroup, Flex, IconButton, Pagination } from "@chakra-ui/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PaginationComp = ({
  page,
  totalItems,
  itemsPerPage,
  setPage,
}: {
  totalItems: number;
  itemsPerPage: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <Pagination.Root
      count={totalItems}
      pageSize={itemsPerPage}
      page={page}
      onPageChange={(e) => setPage(e.page)}
      justifyContent={"center"}
      display={"flex"}
    >
      <ButtonGroup variant="ghost" size={{ base: "xs", sm: "sm" }}>
        <Pagination.PrevTrigger asChild>
          <IconButton>
            <ChevronLeft />
          </IconButton>
        </Pagination.PrevTrigger>

        <Flex display={{ base: "none", sm: "flex" }}>
          <Pagination.Items
            render={(page) => (
              <IconButton variant={{ base: "ghost", _selected: "outline" }}>
                {page.value}
              </IconButton>
            )}
          />
        </Flex>
        <Pagination.PageText format="long" display={{ base: "flex", sm: "none" }} />

        <Pagination.NextTrigger asChild>
          <IconButton>
            <ChevronRight />
          </IconButton>
        </Pagination.NextTrigger>
      </ButtonGroup>
    </Pagination.Root>
  );
};

export default PaginationComp;
