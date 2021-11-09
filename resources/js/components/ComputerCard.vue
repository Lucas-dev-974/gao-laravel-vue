<template>
    <v-card outlined elevation="14" min-width="350">
        <div style="height: 33px !important" class="mb-10">
            <v-app-bar dark dense>
                {{computer.name}}
            </v-app-bar>
        </div>
        <v-list v-for="horraire in horraires" :key="horraire.index">
            <v-list-item>
                <v-row>
                    <v-col cols="2">{{horraire.index}}H</v-col>
                    <v-col cols="6">
                        <span v-if="horraire.attribution"> {{horraire.attribution.client}} </span>
                    </v-col>
                    <v-col cols="4">
                        <AddAttribution v-if="!horraire.attribution" :computer="computer" :hourre="horraire.index" :date="date" @updateHorraire='updateHorraire'/>
                        <v-btn v-else color="red" icon class="ml-2" @click="DeleteAttribution(horraire)"><v-icon>mdi-minus</v-icon></v-btn>
                    </v-col>
                </v-row>
            </v-list-item>
        </v-list>
    </v-card>
</template>

<script src='./js/ComputerCard.js'></script>
