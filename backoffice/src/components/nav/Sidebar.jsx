import React from 'react';
import { HiInbox } from 'react-icons/hi';
import { Button, Sidebar as FlowbiteSidebar } from 'flowbite-react';
import {
  LuMousePointerClick, LuMap, LuHome, LuView, LuLogOut,
} from 'react-icons/lu';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';

const { Items, ItemGroup, Item } = FlowbiteSidebar;

export default function Sidebar() {
  const { logout } = useAuth();

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

          <Item as={Button} icon={LuLogOut} onClick={logout} color="dark">
            <span className="text-white">Se déconnecter</span>
          </Item>
        </ItemGroup>
      </Items>
    </FlowbiteSidebar>
  );
}
