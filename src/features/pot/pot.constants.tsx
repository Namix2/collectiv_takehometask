import type { PotCategory } from "./pot.types";


export const POT_CATEGORIES: Array<{
    label:string;
    value:PotCategory;
    icon:string;
}> = [
    {label: 'To travel somewhere cool', value: 'Travel', icon: '✈️'},
    {label: 'To do a whip-round for a gift', value: 'Gift', icon: '🎁'},
    {label: 'To get sweaty and sporty', value: 'Sport', icon: '🏃'},
    {label: 'To do something fun with your peeps', value: 'Friends', icon: '🎉'},
    {label: 'Something else entirely', value: 'Other', icon: '✨'},
    {label: 'To raise money for charity', value: 'Charity', icon: '❤️'},  
];

export const MAX_POT_NAME_LENGTH = 50;