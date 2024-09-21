const mapDevices = ([id, device]) => {
  return { id, device };
};

export class MidiController {
  constructor(setInputs, setOutputs, onKeyPress, onKeyRelease) {
    navigator.requestMIDIAccess().then(
      (midiAccess) => {
        this.midiAccess = midiAccess;
        this.onKeyPress = onKeyPress;
        this.onKeyRelease = onKeyRelease;
        midiAccess.onstatechange = () => {
          setInputs(Array.from(midiAccess.inputs, mapDevices));
          setOutputs(Array.from(midiAccess.outputs, mapDevices));
        };
        setInputs(Array.from(midiAccess.inputs, mapDevices));
        setOutputs(Array.from(midiAccess.outputs, mapDevices));
      },
      (err) => console.error(`Failed to get MIDI access - ${err}`)
    );
  }

  clearInputsLogging() {
    this.midiAccess.inputs.forEach((entry) => {
      entry.onmidimessage = null;
    });
  }

  getInputMessages(inputId) {
    if (this.midiAccess) {
      this.clearInputsLogging();
      const input = this.midiAccess.inputs.get(inputId);
      if (input) {
        input.onmidimessage = this.onMIDIMessage;
      }
    }
  }

  onMIDIMessage = (message) => {
    const command = message.data[0];
    const note = message.data[1];
    // const velocity = message.data.length > 2 ? message.data[2] : 0;

    switch (command) {
      case 144: // ON
        this.onKeyPress(note);
        break;
      case 128: // OFF
        this.onKeyRelease(note);
        break;
      default:
        return;
    }
  };
}

// const sleep = (ms) => {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// };

// const playNote = async (output, note, time = 500, velocity = 70) => {
//   console.log(`Playing note ${note}`);
//   output.send([144, note, velocity]);
//   await sleep(time);
//   output.send([128, note, 0]);
//   return;
// };

// const onMIDIMessage = (message) => {
//   const command = message.data[0];
//   const note = message.data[1];
//   const velocity = message.data.length > 2 ? message.data[2] : 0;

//   switch (command) {
//     case 144: // ON
//       console.log("NOTE_ON, note: ", note, ", velocity:", velocity);
//       break;
//     case 128: // OFF
//       console.log("NOTE_OFF, note: ", note, ", velocity:", velocity);
//       break;
//     default:
//       return;
//   }
// };

// const sendMiddleC = async (midiAccess, portID) => {
//   const output = midiAccess.outputs.get(portID);
//   await playNote(output, 65);
//   await playNote(output, 67);
//   await playNote(output, 65);
//   await playNote(output, 72, 1000);
//   await playNote(output, 69, 1000);

//   await playNote(output, 65);
//   await playNote(output, 67);
//   await playNote(output, 65);
//   await playNote(output, 72, 1000);
//   await playNote(output, 69, 1000);

//   await playNote(output, 60);
//   await playNote(output, 65);
//   await playNote(output, 67);
//   await playNote(output, 65);
//   await playNote(output, 69, 1000);
//   await playNote(output, 69, 1000);
//   await playNote(output, 69);
//   await playNote(output, 69, 1000);
//   await playNote(output, 67);
//   await playNote(output, 65, 1000);
// };

// const startLoggingMIDIInput = (midiAccess) => {
//   midiAccess.inputs.forEach((entry) => {
//     entry.onmidimessage = onMIDIMessage;
//   });
// };

// const listInputsAndOutputs = (midiAccess) => {
//   for (const entry of midiAccess.inputs) {
//     const input = entry[1];
//     console.log(
//       `Input port [type:'${input.type}']` +
//         ` id:'${input.id}'` +
//         ` manufacturer:'${input.manufacturer}'` +
//         ` name:'${input.name}'` +
//         ` version:'${input.version}'`
//     );
//   }

//   for (const entry of midiAccess.outputs) {
//     const output = entry[1];
//     console.log(
//       `Output port [type:'${output.type}']` +
//         ` id:'${output.id}'` +
//         ` manufacturer:'${output.manufacturer}'` +
//         ` name:'${output.name}'` +
//         ` version:'${output.version}'`
//     );
//   }
// };

// const onMIDISuccess = (midiAccess) => {
//   console.log("MIDI ready!", midiAccess);
//   listInputsAndOutputs(midiAccess);
//   startLoggingMIDIInput(midiAccess);
//   sendMiddleC(midiAccess, "output-1");
// };

// const onMIDIFailure = (msg) => {
//   console.error(`Failed to get MIDI access - ${msg}`);
// };

// navigator.permissions.query({ name: "midi", sysex: true }).then(() => {
//   navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
// });
