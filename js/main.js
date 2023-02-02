let eventBus = new Vue()

Vue.component('note', {
    template: `
    <div class="note">
        <div class="all-notes">
            <div class="note-one">
                <h1>First column</h1>
                <p class="error" v-for="error in errors">{{error}}</p>
                <column class="one" :noteOne="noteOne" :noteTwo="noteTwo"></column>
            </div>
            <div class="note-two">
                <h1>Second column</h1>
                <column class="two" :noteTwo="noteTwo"></column>
            </div>
            <div class="note-three">
                <h1>Third column</h1>
                <column class="two" :noteThree="noteThree"></column>
            </div>
        </div>
        <div class="note-add">
            <note-add></note-add>
        </div>

    </div>
    `,
    data(){
        return{
            noteOne: [],
            noteTwo: [],
            noteThree: [],
            errors: []
        }
    },
    props:{
        noteCard: {
            title: {
                type: Text,
                required: true
            },
            tasks: {
                type: Array,
                required: true,
                completed: {
                    type: Boolean,
                    required: true
                }
            },
            date: {
                type: Date,
                required: false
            },
            status: {
                type: Number,
                required: true
            }
        }
    },
    mounted(){
        eventBus.$on('note-submitted-one', noteCard => {
            this.errors = []
            if (this.noteOne.length < 3){
                this.noteOne.push(noteCard)
                console.log(this.noteOne)
            } else {
                this.errors.push("The quantity noticeably exceeds the permissible norms")
            }
        })
        eventBus.$on('note-submitted-two', noteCard => {
            this.noteTwo.push(noteCard)
        })
        eventBus.$on('note-submitted-three', noteCard => {
            this.noteThree.push(noteCard)
        })
    },
})

Vue.component('note-add', {
    template: `
<div>
    <h1>New add</h1>
    <form class="note-form" @submit.prevent="onSubmit">
        <p class="name-column">
            <label for="name">Name of the note</label>
            <input id="name" v-model="name" maxlength="50" type="text" placeholder="Text">
        </p>
        <p class="name-column">
            <label for="noteOne">Your first note</label>
            <input required id="noteOne" v-model="titleOne" maxlength="50" placeholder="Text of the first note">
        </p>
        <p class="name-column">
            <label for="noteTwo">Your second note</label>
            <input required id="noteTwo" v-model="titleTwo" maxlength="50" placeholder="Text of the second note">
        </p>
        <p class="name-column">
            <label for="noteThree">Your third note</label>
            <input required id="noteThree" v-model="titleThree" maxlength="50" placeholder="Text of the third note">
        </p>
        <p class="name-column">
            <label for="noteFore">Your fourth note</label>
            <input id="noteFore" v-model="titleFore" maxlength="50" placeholder="Text of the fourth note">
        </p>
        <p class="name-column">
            <label for="noteFife">Your fifth note</label>
            <input id="noteFife" v-model="titleFife" maxlength="50" placeholder="Text of the fifth note">
        </p>
        <p class="name-column">
            <input class="btn" type="submit" value="Add">
        </p>
    </form>
</div>
    `,
    data(){
        return{
            name: null,
            titleOne: null,
            titleTwo: null,
            titleThree: null,
            titleFore: null,
            titleFife: null,
            errors: [],

        }

    },
    methods: {
        onSubmit(){
            let noteCard = {
                name: this.name,
                tasks: [{text: this.titleOne, completed: false},
                    {text: this.titleTwo, completed: false},
                    {text: this.titleThree, completed: false},
                    {text: this.titleFore, completed: false},
                    {text: this.titleFife, completed: false}],
                date: null,
                status: 0
            }
            eventBus.$emit('note-submitted', noteCard)
            this.name = null
            this.titleOne = null
            this.titleTwo = null
            this.titleThree = null
            this.titleFore = null
            this.titleFife = null
            console.log(noteCard)
        }
    },
})

Vue.component('note-one', {
    template: `
    <div class="column">
        <div class="card-one" v-for="card in noteOne">
            <notes :card="card" :changeNote="changeNote" ></notes>
        </div>
    </div>
    `,
    methods: {
        changeNote(card) {
            let allNotes = 0
            for (let i = 0; i < 5; i++){
                if (card.tasks[i].text != null){
                    allNotes ++
                }
            }
            if ((card.status / allNotes) * 100 >= 50 && this.noteTwo.length < 5){
                eventBus.$emit('addColOne', card)
                this.noteOne.splice(this.noteOne.indexOf(card), 1)
            }
        }
    },
    props: {
        noteOne: {
            type: Array
        },
        noteTwo: {
            type: Array
        }
    }
})

Vue.component('note-two', {
    template: `
    <div class="column">
        <div class="card-one" v-for="card in noteTwo">
            <notes :card="card" :changeNote="changeNote" ></notes>
        </div>
    </div>
    
    `,
    props:{
        noteTwo: {
            type: Array
        }
    },
    methods: {
        changeNote(card) {
            let allNotes = 0
            for (let i = 0; i < 5; i++){
                if (card.tasks[i].text != null){
                    allNotes ++
                }
            }
            if ((card.status / allNotes) * 100 === 100){
                eventBus.$emit('addColThree', card)
                this.noteTwo.splice(this.noteTwo.indexOf(card), 1)
                card.date = new Date().toLocaleString()
            }
        }
    },

})

Vue.component('note-three', {
    template: `
    <div class="column">
        <div class="card-one" v-for="card in noteThree">
            <notes :card="card"></notes>
        </div>
    </div>
    `,
    props:{
        noteThree: {
            type: Array
        }
    },
})

Vue.component('notes', {
    template: `
    <div>
        <h3>{{noteCard.name}}</h3>
        <ol>
            <li v-for="t in card.tasks"
                v-if="t.text ">
            </li>
        </ol>
    </div>
    `,

})



let app = new Vue({
    el: '#app',
    data: {
        name: "Notes application"
    }
})