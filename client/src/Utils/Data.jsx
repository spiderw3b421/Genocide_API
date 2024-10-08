// React Icons
import { GiBatteredAxe } from "react-icons/gi";
import { SiBookstack } from "react-icons/si";
import { IoNewspaperSharp } from "react-icons/io5";
import { GiBabyfootPlayers } from "react-icons/gi";
import { IoCreate } from "react-icons/io5";
import { FaUserSecret } from "react-icons/fa6";
import { GiMeatCleaver } from "react-icons/gi";
import { GiNewspaper } from "react-icons/gi";
//NanoId
import { nanoid } from "nanoid";

const subLinks = [
  {
    pageId: nanoid(),
    page: "headline",
    links: [
      {
        id: nanoid(),
        label: "bulletBoard",
        icon: <IoNewspaperSharp />,
        url: ".",
      },
      {
        id: nanoid(),
        label: "view headline",
        icon: <GiNewspaper />,
        url: "view-headline",
      },
    ],
  },
  {
    pageId: nanoid(),
    page: "war",
    links: [
      {
        id: nanoid(),
        label: "create group",
        icon: <GiBatteredAxe />,
        url: "war/create-group",
      },
      {
        id: nanoid(),
        label: "Browse Groups",
        icon: <GiBatteredAxe />,
        url: "war/browse-groups",
      },
      {
        id: nanoid(),
        label: "my groups",
        icon: <GiBatteredAxe />,
        url: "war/my-groups",
      },
      {
        id: nanoid(),
        label: "joined groups",
        icon: <GiBatteredAxe />,
        url: "war/joined-groups",
      },
    ],
  },
  {
    pageId: nanoid(),
    page: "education",
    links: [
      {
        id: nanoid(),
        label: "juniorDeveloper",
        icon: <SiBookstack />,
        url: "education",
      },
    ],
  },
  {
    pageId: nanoid(),
    page: "Investment Groups",
    links: [
      {
        id: nanoid(),
        label: "Browse All Groups",
        icon: <GiBabyfootPlayers />,
        url: "investment/browse-all-groups",
      },
      {
        id: nanoid(),
        label: "Create Investment Groups",
        icon: <IoCreate />,
        url: "investment/create-groups",
      },
      {
        id: nanoid(),
        label: "My Investment Groups",
        icon: <IoCreate />,
        url: "investment/select-group",
      },
    ],
  },
  {
    pageId: nanoid(),
    page: "users",
    links: [
      {
        id: nanoid(),
        label: "user profile",
        icon: <FaUserSecret />,
        url: "user/user-profile",
      },
      {
        id: nanoid(),
        label: "leave organization",
        icon: <GiMeatCleaver />,
        url: "user/leave-org",
      },
    ],
  },
];

export default subLinks;
