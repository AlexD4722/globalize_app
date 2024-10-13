import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Container,
  Box,
  SelectChangeEvent,
  FormHelperText
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
interface Locations{
    provinces: string;
    districts: string;
    wards: string;
};
interface AddressSelectorProps {
    onLocations: (locations: Locations) => void;
}
const AddressSelector: React.FC<AddressSelectorProps> = ({ onLocations }) => {
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [provinceError, setProvinceError] = useState<boolean>(false);
  const [districtError, setDistrictError] = useState<boolean>(false);
  const [wardError, setWardError] = useState<boolean>(false);
  const [selectedWard, setSelectedWard] = useState<string>("");

  const ProvincesQuery = useQuery<unknown, Error, Object[]>({
    queryKey: ["provinces", "owner"],
  });
  const DistrictsQuery = useQuery<unknown, Error, Object[]>({
    queryKey: ["districts", selectedProvince],
    enabled: !!selectedProvince,
  });
  const WardsQuery = useQuery<unknown, Error, Object[]>({
    queryKey: ["wards", selectedDistrict],
    enabled: !!selectedDistrict
  });

  const handleProvinceChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    const province = e.target.value as string;
    setSelectedProvince(province);
    setSelectedDistrict("");
    setSelectedWard("");
    setProvinceError(!province);
};

const handleDistrictChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    const district = e.target.value as string;
    setSelectedDistrict(district);
    setSelectedWard("");
    setDistrictError(!district);
};

const handleWardChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    const ward = e.target.value as string;
    setSelectedWard(ward);
    setProvinceError(!ward);
    onLocations(
        {
            provinces: selectedProvince,
            districts: selectedDistrict,
            wards: ward,
        }
    );
};

  return (
    <div>
      <FormControl required fullWidth margin="normal" className="no-focus-outline">
        <InputLabel>Province</InputLabel>
        <Select
          value={selectedProvince}
          onChange={handleProvinceChange}
          label="Province"
        >
          <MenuItem value="">
            <em>Select Province</em>
          </MenuItem>
          {ProvincesQuery.data?.map((province: any) => (
            <MenuItem key={province.code} value={province.code.toString()}>
              {province.nameEn}
            </MenuItem>
          ))}
        </Select>
        {provinceError && <FormHelperText>Province is required</FormHelperText>}
      </FormControl>

      {selectedProvince && (
        <FormControl required fullWidth margin="normal" className="no-focus-outline">
          <InputLabel>District</InputLabel>
          <Select
            value={selectedDistrict}
            onChange={handleDistrictChange}
            label="District"
          >
            <MenuItem value="">
              <em>Select District</em>
            </MenuItem>
            {DistrictsQuery.data?.map((district: any) => (
              <MenuItem key={district.code} value={district.code.toString()}>
                {district.nameEn}
              </MenuItem>
            ))}
          </Select>
          {districtError && <FormHelperText>District is required</FormHelperText>}
        </FormControl>
      )}

      {selectedDistrict && (
        <FormControl required fullWidth margin="normal" className="no-focus-outline">
          <InputLabel>Ward</InputLabel>
          <Select value={selectedWard} onChange={handleWardChange} label="Ward">
            <MenuItem value="">
              <em>Select Ward</em>
            </MenuItem>
            {WardsQuery.data?.map((ward: any) => (
              <MenuItem key={ward.code} value={ward.code.toString()}>
                {ward.nameEn}
              </MenuItem>
            ))}
          </Select>
          {wardError && <FormHelperText>Ward is required</FormHelperText>}
        </FormControl>
      )}
    </div>
  );
};

export default AddressSelector;
