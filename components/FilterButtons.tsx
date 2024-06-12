import React, { useState } from 'react';
import { View } from 'react-native';
import tw from 'twrnc';
import { LARGE_CONTAINER_STYLING } from '../constants/ContainersStyling';

import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface FilterButtonProps {
  label: string;
}

const FilterButton = ({ label}: FilterButtonProps) => {
  return (
    <TouchableOpacity style={LARGE_CONTAINER_STYLING.LARGE_ROUNDED_iMAGE_CONTAINER_STYLING_ACCOUNT_FILTERBUTTONS}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 1,
    width:40,
    borderWidth: 1,
    borderRadius: 1,
    borderColor: 'black',
  },
  selectedButton: {
    backgroundColor: 'blue',
    borderColor: 'blue',
  },
  label: {
    fontSize: 10,
    fontWeight: 'bold',
  },
});
export default FilterButton;