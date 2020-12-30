import { Item } from '@app/model/shop/Item';
import {
    CHANCLETA_ADDRESS,
    METAL_ROD_ADDRESS,
    PLASTIC_KNIFE_ADDRESS,
    WOODEN_STICK_ADDRESS,
    SWITCHBLADE_ADDRESS,
    KNUCKE_DUSTERS_ADDRESS,
    PLASTIC_SWORD_ADDRESS,
    BASEBALL_BAT_ADDRESS,
    AXE_ADDRESS,
} from '@app/web3/constants/contracts/Shop/items';

export function findItemByAddress(address: string): Item {
    switch (address) {
        case WOODEN_STICK_ADDRESS:
            return {
                image:
                    'data:image/jpeg;base64,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',
                description:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pulvinar quam sem, eu auctor eros tempor vitae. Curabitur in massa arcu. Fusce euismod erat tellus, et rutrum justo porttitor eget. Curabitur tempus sagittis accumsan. Morbi a massa consectetur, congue lectus non, imperdiet quam. Curabitur arcu est, tempor at vestibulum eget, porta sit amet nisi. Vestibulum lobortis lectus enim, vel maximus ipsum tincidunt non.',
            };
        case METAL_ROD_ADDRESS:
            return {
                image:
                    'https://previews.123rf.com/images/donatas1205/donatas12051404/donatas1205140400053/27509082-industrial-metal-pipe-alphabet-letter.jpg',
                description:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pulvinar quam sem, eu auctor eros tempor vitae. Curabitur in massa arcu. Fusce euismod erat tellus, et rutrum justo porttitor eget. Curabitur tempus sagittis accumsan. Morbi a massa consectetur, congue lectus non, imperdiet quam. Curabitur arcu est, tempor at vestibulum eget, porta sit amet nisi. Vestibulum lobortis lectus enim, vel maximus ipsum tincidunt non.',
            };
        case PLASTIC_KNIFE_ADDRESS:
            return {
                image: 'https://images-na.ssl-images-amazon.com/images/I/21E1166asDL._AC_.jpg',
                description:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pulvinar quam sem, eu auctor eros tempor vitae. Curabitur in massa arcu. Fusce euismod erat tellus, et rutrum justo porttitor eget. Curabitur tempus sagittis accumsan. Morbi a massa consectetur, congue lectus non, imperdiet quam. Curabitur arcu est, tempor at vestibulum eget, porta sit amet nisi. Vestibulum lobortis lectus enim, vel maximus ipsum tincidunt non.',
            };
        case CHANCLETA_ADDRESS:
            return {
                image:
                    'https://www.soyvisual.org/sites/default/files/styles/twitter_card/public/images/photos/rop_0034-s.jpg?itok=l4yUhdXD',
                description:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pulvinar quam sem, eu auctor eros tempor vitae. Curabitur in massa arcu. Fusce euismod erat tellus, et rutrum justo porttitor eget. Curabitur tempus sagittis accumsan. Morbi a massa consectetur, congue lectus non, imperdiet quam. Curabitur arcu est, tempor at vestibulum eget, porta sit amet nisi. Vestibulum lobortis lectus enim, vel maximus ipsum tincidunt non.',
            };
        case SWITCHBLADE_ADDRESS:
            return {
                image:
                    'https://bloximages.newyork1.vip.townnews.com/qconline.com/content/tncms/assets/v3/editorial/7/fd/7fd025e3-2d6f-5b73-a40a-7110df1edb20/5c7869d33ff4c.image.png',
                description:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pulvinar quam sem, eu auctor eros tempor vitae. Curabitur in massa arcu. Fusce euismod erat tellus, et rutrum justo porttitor eget. Curabitur tempus sagittis accumsan. Morbi a massa consectetur, congue lectus non, imperdiet quam. Curabitur arcu est, tempor at vestibulum eget, porta sit amet nisi. Vestibulum lobortis lectus enim, vel maximus ipsum tincidunt non.',
            };
        case AXE_ADDRESS:
            return {
                image: 'https://www.gransforsbruk.com/wp-content/uploads/475-large-carving-axe-1440x1050.jpg',
                description:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pulvinar quam sem, eu auctor eros tempor vitae. Curabitur in massa arcu. Fusce euismod erat tellus, et rutrum justo porttitor eget. Curabitur tempus sagittis accumsan. Morbi a massa consectetur, congue lectus non, imperdiet quam. Curabitur arcu est, tempor at vestibulum eget, porta sit amet nisi. Vestibulum lobortis lectus enim, vel maximus ipsum tincidunt non.',
            };
        case BASEBALL_BAT_ADDRESS:
            return {
                image: 'https://cdn.images.fecom-media.com/HE1692560_185176-DAV-SPT-P01.jpg',
                description:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pulvinar quam sem, eu auctor eros tempor vitae. Curabitur in massa arcu. Fusce euismod erat tellus, et rutrum justo porttitor eget. Curabitur tempus sagittis accumsan. Morbi a massa consectetur, congue lectus non, imperdiet quam. Curabitur arcu est, tempor at vestibulum eget, porta sit amet nisi. Vestibulum lobortis lectus enim, vel maximus ipsum tincidunt non.',
            };
        case PLASTIC_SWORD_ADDRESS:
            return {
                image: 'https://images.partydelights.co.uk/TOYS/21/6/front/v1/pop/2.jpg',
                description:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pulvinar quam sem, eu auctor eros tempor vitae. Curabitur in massa arcu. Fusce euismod erat tellus, et rutrum justo porttitor eget. Curabitur tempus sagittis accumsan. Morbi a massa consectetur, congue lectus non, imperdiet quam. Curabitur arcu est, tempor at vestibulum eget, porta sit amet nisi. Vestibulum lobortis lectus enim, vel maximus ipsum tincidunt non.',
            };
        case KNUCKE_DUSTERS_ADDRESS:
            return {
                image: 'https://i.ytimg.com/vi/gcqYuyAOnhk/maxresdefault.jpg',
                description:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pulvinar quam sem, eu auctor eros tempor vitae. Curabitur in massa arcu. Fusce euismod erat tellus, et rutrum justo porttitor eget. Curabitur tempus sagittis accumsan. Morbi a massa consectetur, congue lectus non, imperdiet quam. Curabitur arcu est, tempor at vestibulum eget, porta sit amet nisi. Vestibulum lobortis lectus enim, vel maximus ipsum tincidunt non.',
            };
    }
}
