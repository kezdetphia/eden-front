// import {
//   Accordion,
//   AccordionItem,
//   AccordionHeader,
//   AccordionTrigger,
//   AccordionTitleText,
//   AccordionContent,
//   AccordionContentText,
//   AccordionIcon,
//   Divider,
// } from "@gluestack-ui/accordion";

// export default () => (
//   <Accordion
//     size="md"
//     variant="filled"
//     type="single"
//     isCollapsible={true}
//     isDisabled={false}
//     className="m-5 w-[90%] border border-outline-200"
//   >
//     <AccordionItem value="a">
//       <AccordionHeader>
//         <AccordionTrigger>
//           {({ isExpanded }) => {
//             return (
//               <>
//                 <AccordionTitleText>
//                   How do I place an order?
//                 </AccordionTitleText>
//                 {isExpanded ? (
//                   <AccordionIcon as={ChevronUpIcon} className="ml-3" />
//                 ) : (
//                   <AccordionIcon as={ChevronDownIcon} className="ml-3" />
//                 )}
//               </>
//             );
//           }}
//         </AccordionTrigger>
//       </AccordionHeader>
//       <AccordionContent>
//         <AccordionContentText>
//           To place an order, simply select the products you want, proceed to
//           checkout, provide shipping and payment information, and finalize your
//           purchase.
//         </AccordionContentText>
//       </AccordionContent>
//     </AccordionItem>
//     <Divider />
//     <AccordionItem value="b">
//       <AccordionHeader>
//         <AccordionTrigger>
//           {({ isExpanded }) => {
//             return (
//               <>
//                 <AccordionTitleText>
//                   What payment methods do you accept?
//                 </AccordionTitleText>
//                 {isExpanded ? (
//                   <AccordionIcon as={ChevronUpIcon} className="ml-3" />
//                 ) : (
//                   <AccordionIcon as={ChevronDownIcon} className="ml-3" />
//                 )}
//               </>
//             );
//           }}
//         </AccordionTrigger>
//       </AccordionHeader>
//       <AccordionContent>
//         <AccordionContentText>
//           We accept all major credit cards, including Visa, Mastercard, and
//           American Express. We also support payments through PayPal.
//         </AccordionContentText>
//       </AccordionContent>
//     </AccordionItem>
//   </Accordion>
// );

import React, { Component } from "react";
import Accordion from "react-native-collapsible/Accordion";

const SECTIONS = [
  {
    title: "First",
    content: "Lorem ipsum...",
  },
  {
    title: "Second",
    content: "Lorem ipsum...",
  },
];

class AccordionView extends Component {
  state = {
    activeSections: [],
  };

  _renderSectionTitle = (section) => {
    return (
      <View style={styles.content}>
        <Text>{section.content}</Text>
      </View>
    );
  };

  _renderHeader = (section) => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{section.title}</Text>
      </View>
    );
  };

  _renderContent = (section) => {
    return (
      <View style={styles.content}>
        <Text>{section.content}</Text>
      </View>
    );
  };

  _updateSections = (activeSections) => {
    this.setState({ activeSections });
  };

  render() {
    return (
      <Accordion
        sections={SECTIONS}
        activeSections={this.state.activeSections}
        renderSectionTitle={this._renderSectionTitle}
        renderHeader={this._renderHeader}
        renderContent={this._renderContent}
        onChange={this._updateSections}
      />
    );
  }
}
