<template>
    <div class='control-container'>
        <div class='title'>{{ title }}</div>
        <div class='selector-container' @click.prevent.stop='openSelector'>
            <div class='closed-selector' v-show='!selectorOpened'>
                <div class='closed-digit ellipsis'>{{ divideByThousands(vuexValue) }}</div>
                <font-awesome-icon icon="angle-down" class='icon-down'/>
            </div>
            <div class='opened-selector-container' ref='controlContainer'>
                <input class='opened-selector'
                       :class="{'on-focus': selectorOpened}"
                       type='number'
                       min='0'
                       @input='onInputChange'
                       @keyup.esc='escapeHandler'
                       @keyup.enter='enterHandler'
                       @keydown.up='focusAndSelect'
                       @keydown.down='focusAndSelect'
                       @keydown.tab='tabHandler'
                       ref='input'
                >
                <div class='selector-controls' v-show='selectorOpened'>
                    <div class='up' @click='controlUp'>
                        <font-awesome-icon icon="caret-up"/>
                    </div>
                    <div class='down' @click='controlDown'>
                        <font-awesome-icon icon="caret-down"/>
                    </div>
                </div>
                <div class='helper-function'
                     v-if='helperFunction && selectorOpened'
                     @click='this[helperFunction]'
                    >{{ helperFunctionName }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState, mapGetters } from 'vuex'
    import { divideByThousands } from '~a/helpers'

    export default {
        props: {
            title: {
                type: String,
                required: true
            },
            type: {
                type: String,
                required: true
            },
            helperFunction: {
                type: String,
                required: false
            },
            helperFunctionName: {
                type: String,
                required: false
            }
        },

        data: () => ({
            selectorOpened: false,
            tempValue: 0
        }),

        mounted(){
            let input = this.$refs.input;
            input.value = this.vuexValue;
            this.tempValue = this.vuexValue;

            input.onfocus = () => {
                this.selectorOpened = true;
            };

            document.addEventListener("click", this.clickOutsideEvent);
        },

        watch: {
            //Смотрим изменения во vuex и обновляем вспомогательные значения
            vuexValue: function () {
                this.tempValue = this.vuexValue;
                this.$refs.input.value = this.vuexValue;
            },
        },

        computed: {
            ...mapState({
                first: state => state.controls.first,
                second: state => state.controls.second,
                third: state => state.controls.third,
            }),

            ...mapGetters([
                'getSummary'
            ]),

            vuexValue(){
                if (this.type === 'first') return this.first;
                else if (this.type === 'second') return this.second;
                else if (this.type === 'third') return this.third;
            }
        },
        methods: {
            summaryHelper(){
                this.tempValue = this.getSummary;
                this.$refs.input.value = this.getSummary;
                this.focusAndSelect();
            },

            constantHelper(){
                this.tempValue = 1000;
                this.$refs.input.value = this.tempValue;
                this.focusAndSelect();
            },

            mutateValue(value){
                if (this.type === 'first') {
                    this.$store.commit('setFirst', value);
                } else {
                    this.$store.commit('setSecond', value);
                    this.$store.commit('setThird', value);
                }
            },

            controlUp(){
                this.focusAndSelect();
                this.tempValue = this.tempValue + 1;
                this.$refs.input.value = this.tempValue;
            },

            controlDown(){
                this.focusAndSelect();
                this.tempValue = (this.tempValue > 0) ? this.tempValue - 1 : 0;
                this.$refs.input.value = this.tempValue;
            },

            openSelector(){
                if (!this.selectorOpened) this.focusAndSelect();
            },

            focusAndSelect(){
                let input = this.$refs.input;
                input.focus();

                //с помощью таймаута переносим команду на выделение в конец стека вызова
                setTimeout(() => {
                    input.select();
                }, 0);
            },

            onInputChange(e) {
                this.tempValue = +e.target.value;
            },

            escapeHandler(){
                this.tempValue = this.vuexValue;
                this.$refs.input.blur();
            },

            enterHandler(){
                this.mutateValue(this.tempValue);
                this.$refs.input.blur();
            },

            tabHandler(){
                if (this.selectorOpened) this.selectorOpened = false
            },

            clickOutsideEvent(evt){
                const container = this.$refs.controlContainer; // Элемент за которым следим
                let targetElement = evt.target; // Элемент по которому кликнули
    
                do {
                    // Если клик по контейнеру, прерываем цикл.
                    if (targetElement === container) return;
                    // Поднимаемся по DOM
                    targetElement = targetElement.parentNode;
                } while (targetElement);

                // Клик вне контейнера
                this.clickedOutside();
            },

            clickedOutside(){
                if (this.selectorOpened) {
                    this.selectorOpened = false;
                    this.mutateValue(this.tempValue);
                    this.$refs.input.value = this.vuexValue;
                }
            },

            divideByThousands(number){
                // Выделил разделение на тысячи в отдельный файл. Так бы я поступил в реальном проекте, так как
                // этот метод явно бы понадобился где-то ещё вне компонента
                return divideByThousands(number)
            }
        },

        beforeDestroy() {
            document.removeEventListener("click", this.clickOutsideEvent);
        }
    }
</script>

<style lang='sass' scoped>
    .control-container
        display: flex
        justify-content: space-between
        max-width: 100%
        padding-left: 80px
        margin-bottom: 60px


    .title
        font-size: 16px
        color: rgba(0, 0, 0, .5)


    .selector-container
        position: relative
        width: 110px


    .closed-selector
        display: flex
        align-items: center
        width: 100%
        font-size: 16px
        cursor: pointer
        transition: color linear .2s
        background-color: #fff

        &:hover
            .closed-digit
                color: rgb(0, 50, 150)


    .closed-digit
        max-width: 110px
        margin-right: 5px


    .icon-down
        margin-left: 3px
        font-size: 0.7em


    .selector-controls
        position: absolute
        top: 0
        right: -20px
        width: 20px
        height: 25px


    .up, .down
        width: 100%
        height: 50%
        margin: 0
        color: rgb(0, 50, 150)
        font-size: 0.8em
        text-align: center
        cursor: pointer


    .opened-selector-container
        position: absolute
        left: -5px
        top: -4px
        height: 22px
        width: 100%


    .opened-selector
        width: 100%
        padding: 3px 20px 3px 4px
        color: transparent
        border: none
        background-color: transparent
        pointer-events: none
        z-index: -1

        &.on-focus
            z-index: 0
            border: 1px solid lightgrey
            color: black
            background-color: rgb(250, 250, 250)
            pointer-events: auto


    .helper-function
        position: absolute
        top: calc(100% + 5px)
        left: 6px
        font-size: 12px
        color: dodgerblue
        cursor: pointer
</style>