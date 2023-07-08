import React from 'react';
import { HiInbox } from 'react-icons/hi';
import { Sidebar as FlowbiteSidebar } from 'flowbite-react';
import {
  LuMousePointerClick, LuMap, LuHome, LuView,
} from 'react-icons/lu';
import { Link } from 'react-router-dom';

const { Items, ItemGroup, Item } = FlowbiteSidebar;

export default function Sidebar() {
  return (
    <FlowbiteSidebar className="mr-5 shadow-lg rounded-lg list-none list-inside w-full md:w-64 md:collapse-open">
      <Items>
        <ItemGroup>
          <Item as={Link} to="/" icon={LuHome}>
            Accueil
          </Item>
          <Item
            as={Link}
            to="/tracking"
            icon={LuMousePointerClick}
          >
            Tracking
          </Item>
          <Item as={Link} to="/views" icon={LuView}>
            Page Views
          </Item>
          <Item as={Link} to="/sessions" icon={HiInbox}>
            Sessions
          </Item>
          <Item as={Link} to="/heatmap" icon={LuMap}>
            Heat Maps
          </Item>
        </ItemGroup>
      </Items>
    </FlowbiteSidebar>
  );
}
