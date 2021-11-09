<template>
    <v-dialog v-model="dialog" max-width="600">
        <template v-slot:activator="{on}">
            <v-btn color="success" v-on="on" icon class="ml-3">
                <v-icon color="green" >mdi-plus</v-icon>
            </v-btn>
        </template>

        <v-card>
            <v-card-title primary-title>
                Ajout d'une attribution pour {{ computer.name }}
            </v-card-title>
            
            <v-card-text>
                <v-autocomplete :loading="loading" :items="clients" :search-input.sync="search" v-model="client" 
                item-text="name" filled return-object cache-items hide-no-data hide-details label="Sélection le client">
                </v-autocomplete>                
            </v-card-text>

            <v-card-text v-if="addClient">
                <v-text-field label="Nom de du client" v-model="clientName" @keyup.enter="AddClient"></v-text-field>
            </v-card-text>

            <v-card-actions class="d-flex justify-space-around">
                <v-btn color="success" @click="addClient=true">Ajouter un client</v-btn>
                <v-btn color="success" @click="Attribuer">Attribuer</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script src="./js/AddAttribution.js"></script>
