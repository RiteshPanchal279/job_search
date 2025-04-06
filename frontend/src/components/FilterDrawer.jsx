import React, { useState } from "react";
import FilterCard from "./FilterCard";
import { Button } from "./ui/button";
import { Filter } from "lucide-react";

const FilterDrawer = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      {/* Filter button for mobile */}
      <div className="block md:hidden mb-4">
        <Button
          onClick={() => setShow(true)}
          className="flex items-center gap-2 bg-blue-600 text-white w-full"
        >
          <Filter className="w-4 h-4" />
          Filter Jobs
        </Button>
      </div>

      {/* Drawer itself (mobile + desktop) */}
      <div className="hidden md:block">
        <FilterCard show={true} setShow={() => {}} />
      </div>

      {/* Animated drawer for mobile */}
      <div className="md:hidden fixed inset-0 z-[9999] bg-black bg-opacity-40" style={{ display: show ? 'block' : 'none' }}>
        <FilterCard show={show} setShow={setShow} />
      </div>
    </>
  );
};

export default FilterDrawer;
