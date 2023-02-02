let eventBus = new Vue()

let app = new Vue({
    el: '#app',
    data:{

    }
})

Vue.component('Notes', {
    templates: `
    <div class="Notes">
        <div class="all-notes">
            <div class="note-one">
                <h1>First column</h1>
                <column class="one" :notesOne="notesOne"></column>
            </div>
            <div class="note-two">
                <h1>Second column</h1>
            </div>
            <div  class="note-three">
                <h1>Third column</h1>
            </div>
        </div>
        <div class="note-add">
            <Notes-add></Notes-add>
        </div>
    </div>
    `,
    data(){
        return {
            noteOne: [],
            noteTwo: [],
            noteThree: [],
            // noteFore: [],
            // noteFife: [],
            errors: []
        }
    },
    methods:{

    },
    props: {
        noteCard: {
            title: {
                type: Text,
                required: true
            },
            tasks: {
                type: Array,
                required: true
            }
        }
    },
    mounted(){
        eventBus.$on('Notes', noteCard => {
            if(this.noteOne.length < 3){
                this.noteOne.push(noteCard)
                console.log(this.noteOne)
            } else {
                this.errors.push("The quantity noticeably exceeds the permissible norms")
            }
        })
    }
})

// Vue.component('Notes-tab', {
//     templates: `
//     <div>
//         <ul>
//             <span class="tab"
//             :class="{activeTab: selectedtab === tab}"
//             @click="selectedTab = tab">
//             {{tab}}
//             </span>
//         </ul>
//     </div>
//     `,
//     data() {
//         return {
//
//         }
//     },
//     methods: {
//
//     },
//     props: {
//
//     }
// })

Vue.component('Notes-add', {
    templates: `
    <form class="note-form" @submit.prevent="onSubmit">
        <p class="name-column>
            <label for="name">Name of the note</label>
            <input id="name" v-model="name" maxlength="50" placeholder="Text">
        </p>
        <p class="name-column">
            <label for="noteOne">Your first note</label>
            <input id="noteOne" v-model="noteOne" maxlength="50" placeholder="Text of the first note">
        </p>
        <p class="name-column">
            <label for="noteTwo">Your second note</label>
            <input id="noteTwo" v-model="noteTwo" maxlength="50" placeholder="Text of the second note">
        </p>
        <p class="name-column">
            <label for="noteThree">Your third note</label>
            <input id="noteThree" v-model="noteThree" maxlength="50" placeholder="Text of the third note">
        </p>
        <p class="name-column">
            <label for="noteFore">Your fourth note</label>
            <input id="noteFore" v-model="noteFore" maxlength="50" placeholder="Text of the fourth note">
        </p>
        <p class="name-column">
            <label for="noteFife">Your fifth note</label>
            <input id="noteFife" v-model="noteFife" maxlength="50" placeholder="Text of the fifth note">
        </p>
        <p class="name-column">
            <input class="btn" type="submit" value="Add">
        </p>
    </form>
    `,
    data() {
        return {
            name: null,
            noteOne: null,
            noteTwo: null,
            noteThree: null,
            noteFore: null,
            noteFife: null,
            errors: [],
        }
    },
    methods: {
        onSubmit(){
            let noteCard = {
                name: this.name,
                tasks: [{text: this.noteOne, completed: false},
                    {text: this.noteTwo, completed: false},
                    {text: this.noteThree, completed: false},
                    {text: this.noteFore, completed: false},
                    {text: this.noteFife, completed: false},
                ],
                date: null,
                status: 0
            }
            eventBus.$emit('note-submitted', noteCard)
            this.name = null
            this.noteOne = null
            this.noteTwo = null
            this.noteThree = null
            this.noteFore = null
            this.noteFife = null
            console.log(noteCard)
        }
    },
    props: {
        noteOne: {
            type: Array,
            required: false
        }
    }
})