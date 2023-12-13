import { hm } from "../helpers/html.js";

class Nexum {
    constructor() {
        this.data = {
            contacts: [
                {
                    nome: "Cellbit",
                    img: "./imgs/users/cellbit.png",
                    msgs: [[0, "Oiee"], [1, "Oieee"]]
                }
            ]
        }
    }

    html() {
        return {
            contacts: `
                <div class="w-full h-1/10 bg-indigo-950 px-3">
                    <div class="w-full h-full flex items-center">
                        <img src="./imgs/icons/nexum-logo.png" alt="" class="h-full w-max py-4 invert">
                        <h1 class="text-white text-3xl pl-2">Nexum</h1>
                    </div>
                </div>
                
                <div class="w-full h-9/10 bg-slate-50">
                    <ul class="h-full grid grid-rows-8 gap-2" id="contacts">
                    </ul>
                </div>
            `,
            chat: `
                <div class="w-full h-1/10 bg-indigo-950 px-3">
                    <span class="w-full h-full flex items-center" id="chat-header">   
                    </span>
                </div>

                <div class="w-full h-9/10 bg-indigo-900">
                    <div class="w-full h-full flex flex-col">
                        <ul class="w-full h-9/10 overflow-x-auto no-scrollbar" id="chat-content">
                        </ul>
                        <span class="w-full h-1/10 flex">
                            <span class="w-5/6 m-1 bg-indigo-700 rounded-xl shadow-xl"></span>
                            <span class="w-1/6 h-full p-3 flex items-center justify-center hover:cursor-pointer">
                                <img src="./imgs/icons/send-arrow.png" alt="" class="w-max h-full">
                            </span>
                        </span>
                    </div>
                </div>
            `
        }
    }

    contacts() {
        hm.inner("#nexum", this.html().contacts, "clear");
        this.loadContacts();
    }

    loadContacts() {
        this.data.contacts.forEach(el => {
            const contact = hm.create("div", `
            <li class="w-full h-full grid grid-template-usermsg box-border hover:bg-indigo-800 p-1 cursor-pointer transition-colors">
                <span class="grid-area-icon flex justify-center box-border">
                    <img class="w-max h-full rounded-full" src="${el.img}"></img>
                </span>
                <h2 class="grid-area-name text-lg">${el.nome}</h2>
                <span class="grid-area-time text-right">03/02/2023</span>
                <span class="grid-area-lastmsg">${["", "Você: "][el.msgs[0][0] * 1]}${el.msgs[0][1]}</span>
            </li>
            `)

            contact.addEventListener("click", e => {
                this.chat(el);
            })

            hm.append("#contacts", contact);
        })
    }

    chat(userObj) {
        hm.inner("#nexum", this.html().chat, "clear")
        this.loadChat(userObj);
    }

    loadChat(userObj) {
        hm.inner("#chat-header", `
        <img src="${userObj.img}" alt="" class="w-1/6 h-full rounded-full p-2">
            <h2 class="text-white text-lg ml-2">${userObj.nome}</h2>
        `)
        userObj.msgs.reverse().forEach(e => {
            hm.inner("#chat-content", `
                <li class="${["flex m-3", "flex justify-end m-3"][e[0] * 1]}">
                    <p class="${["bg-indigo-950 p-2 rounded-md text-white shadow-lg max-w-2/3","bg-slate-900 p-2 rounded-md text-white max-w-2/3 break-words"][e[0] * 1]}">${e[1]}</p>
                </li>
            `)
        })
    }

    init() {
        this.contacts();
    }
}

export const nexum = new Nexum();