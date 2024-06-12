import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Image, Button, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { getMnemonicResponse } from './apiService';
import Config from './config';

// Use environment variables
const apiKey = Config.GEMINI_API_KEY;

//variable declarations
let grid, row, stopwatch, timer;
row = [ [], [], [] ];
grid = [row[0], row[1], row[2]];

export default function App() {
  const [inputText, setInputText] = useState('');
  const [mnemonicResponse, setMnemonicResponse] = useState('');
  const [error, setError] = useState<string | null>(null); // State to hold error message

  const [event_A, setEventA] = useState(false);
  const [event_B, setEventB] = useState(false);
  const [sub_A, setsub_A] = useState(false);
  const [sub_B, setsub_B] = useState(false);

  const handleGetMnemonic = async () => {
    try {
      if (!inputText.trim()) {
        setError('Please provide text to create a mnemonic.');
        return;
      }

      const prompt = `Create a Mnemonic that will help users to memorize: ${inputText}. Ensure that it is formatted in clear bullet points, texts are spaced well, and sentences are as brief as possible. If possible, give a list of hyperlinked sources and citations.`;
      const response = await getMnemonicResponse(prompt);

      const inquiry = `Tell me what you think of: ${inputText}`;
      const inquiryResponse = await getMnemonicResponse(inquiry);
      
      // Assuming response structure based on previous examples
      let content = response.candidates[0].content.parts[0].text; // Adjust path based on actual API response structure
      let myContent = inquiryResponse.candidates[0].content.parts[0].text; 
      content = content.replace(/[*#]/g, '');
      myContent = myContent.replace(/[*#]/g, '');
      console.log(myContent);
      setMnemonicResponse(content);
      setError(null); // Clear any previous errors
    } catch (err) {
      setError(`Error: ${err.message || 'Unknown error'}`); // Access error message for better clarity
    }
  };

  const show_home = () => {
    console.log("...");
    console.log("Title btn pressed");
    console.log("Returned to home.");
    setEventA(false);
    setEventB(false);
    setsub_A(false);
    setsub_B(false);
  };
  const showAboutcontent = () => {
    console.log("...");
    console.log("About btn pressed.");
    setEventA(true);
    setEventB(false);
  };
  const showStartcontent = () => {
    console.log("...");
    console.log("Start btn pressed.");
    setEventB(true);
    setEventA(false);
  };
  const Gridhandler =()=>{
    console.log('...');
    console.log('Grid is opened.');
    setsub_A(true);
    };
  const gridRender =()=>{
    const gridArr = Array.from({length:9});//creates 3x3 grid
    return gridArr.map((_, index)=>(
      <TouchableOpacity key={index} style={styles.grid}></TouchableOpacity>
    ));

  };
  const Bothandler = () =>{
    console.log('...');
    console.log('Bot Is Activated..');
    setsub_B(true);
  };
  const aboutDesign = [
    styles.nav_Outter,
    event_A && styles.hide,
    event_B && styles.hide,
  ];

  const startDesign = [
    styles.nav_Outter,
    event_B && styles.hide,
    event_A && styles.hide,
  ];
  const showGrid = [
    styles.nav_Outter,
    sub_A && styles.hide,
    sub_B && styles.hide,
  ];
  const showBot = [
    styles.nav_Outter,
    sub_A && styles.hide,
    sub_B && styles.hide,
  ];
  

  return (
    <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity onPress={show_home} style={styles.nav_title}>
          <Text style={styles.title}><Text style={styles.subscript}>(M)</Text>Neuronic</Text>
        </TouchableOpacity>

        {event_A && (
          <View style={styles.nav_Outter}>
            <Text style={styles.navAbout}>
              <Text style={styles.nav_sub}>Summary</Text>
              <Text>
                {'\n'}
                (m)Neuronic is a way to assist ADHD people like myself to engage in the development/honing of their memorization skills. It is literally the sum total of memorization techniques that have helped me learn difficult STEM subjects like chemistry and organic chemistry, or programming.
                {'\n'}
                {'\n'}
                (m)Neuronic is NOT:
                {'\n'}
                {'\u2022'}A cure/or treatment for neurodivergence.
                {'\n'}
                {'\u2022'}An IQ booster.
                {'\n'}
                {'\u2022'}An Alternative to medication.
                {'\n'}
                {'\u2022'}An end-all-be-all-solution.
              </Text>
            </Text>

            <Text style={styles.navAbout}>
              <Text style={styles.nav_sub}>Resources</Text>
              <Text>
              
              </Text>
            </Text>

            <Text style={styles.navAbout}>
              <Text style={styles.nav_sub}>Citations</Text>
              <Text>
              
              </Text>
            </Text>
          </View>
        )}
        {sub_A && (
          <View style = {styles.gridContainer}>
            {gridRender()}
          </View>
        )}
        {event_B && (
          <View>
            <TouchableOpacity style={showBot} onPress={Bothandler}>
              <Image source = {require('C:\Users\fsami\OneDrive\Documents\Neuroware\Neuron_APP\mNeuronic\accessories\icons8-robot-24.png') } style={styles.nav_sub} />
            </TouchableOpacity>
            <TouchableOpacity style={showGrid} onPress={Gridhandler}>
              <Text style={styles.nav_sub}>Concentration</Text>
            </TouchableOpacity>
          </View>
        )}
        {sub_B && (
          <ScrollView>
              <TextInput
              style={styles.input}
              editable
              multiline
              numberOfLines={5}
              maxLength={200}
              placeholder="Enter text (0-200 characters)"
              value={inputText}
              onChangeText={setInputText}
            />
            <TouchableOpacity style={styles.nav_Outter}onPress={handleGetMnemonic}>
              <Text style = {styles.nav}>Ask</Text>
            </TouchableOpacity>
            {mnemonicResponse ? (
              <Text style={styles.response}>{mnemonicResponse}</Text>
            ) : null}
            {error ? (
              <Text style={styles.error}>{error}</Text>
            ) : null}
          </ScrollView>
        )}

        <TouchableOpacity onPress={showAboutcontent} style={aboutDesign}>
          <Text style={styles.nav}>About</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={showStartcontent} style={startDesign}>
          <Text style={styles.nav}>Start</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navResults}>
          <Text style={styles.nav}>Results</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e7f2ff',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#5da6e7',
    borderWidth: 10,
    borderStyle: 'solid',
    borderRadius: 10,
    // marginTop: 50,
    padding: 10,
    height: '100%',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  subscript: {
    fontSize: 15,
  },
  title: {
    color: '#051727',
    marginTop: 25,
    padding: 25,
    fontSize: 30,
    fontWeight: 'bold',
  },
  nav_title: {
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    borderStyle: 'solid',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nav: {
    color: '#5da6e7',
    padding: 20,
    fontSize: 20,
    borderColor: '#5da6e7',
    borderWidth: 2,
    borderStyle: 'solid',
    textAlign: 'center',
  },
  
  navResults: {
    borderRadius: 10,
    margin: 75,
    display: 'none',
  },
  nav_Outter: {
    borderRadius: 10,
    margin: 75,
  },
  hide: {
    display: 'none',
  },
  navAbout: {
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    borderStyle: 'solid',
    textAlign: 'left',
    fontSize: 20,
    letterSpacing: 2.5,
  },
  nav_sub: {
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    borderStyle: 'solid',
    fontSize: 30,
    fontWeight: 'bold',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 50,
    borderColor: 'gray',
    backgroundColor: '#f1f7fe',
    borderWidth: 0.5,
    marginTop: 20,
    marginBottom: -20,
    paddingLeft: 10,
    flex: 1,
  },
  response: {
    marginTop: 20,
    fontSize: 18,
  },
  error: {
    marginTop: 20,
    fontSize: 18,
    color: 'red',
  },

  //grid exercise styling
  grid: {
    borderRadius: 50,
    backgroundColor: 'blue',
    height: 50,
    width: 50,
    margin: 50,
  },
});
