import React from 'react';
import { StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { useAppTheme } from '../hooks/useAppTheme';
import { CustomThemeType } from '../themes/theme';

interface CustomSearchBarProps {
  placeholder?: string;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const CustomSearchBar: React.FC<CustomSearchBarProps> = ({
  placeholder,
  searchQuery,
  setSearchQuery,
}) => {
  const {colors} = useAppTheme();
  const styles = makeStyles(colors);
  return (
    <Searchbar
      placeholder={placeholder || 'Search'}
      onChangeText={setSearchQuery}
      value={searchQuery}
      style={styles.searchbar}
    />
  );
};

export default CustomSearchBar;

const makeStyles = (colors: CustomThemeType['colors']) =>
  StyleSheet.create({
    searchbar: {
      elevation: 3,
      borderRadius: 8,
      borderColor: colors.CommonBackground,
      borderWidth: 1,
    },
  });
