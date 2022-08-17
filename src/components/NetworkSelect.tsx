import React, { useCallback, useEffect } from "react";
import { MenuItem, Select, SelectProps } from "@mui/material";
import styled from "@emotion/styled";
import cx from "classnames";

import { useNavigate } from "react-router-dom";
import { useArchives } from "../hooks/useArchives";

const StyledSelect = styled(Select)`
  border-radius: 8px !important;
  overflow: hidden;

  background-color: #61dafb !important;
  border-color: #14a1c0;
  text-transform: capitalize !important;

  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: #14a1c0;
    }
  }
`;

type NetworkSelectProps = Omit<SelectProps, "value" | "onChange"> & {
  value?: string;
  onChange?: (value: string) => void;
};

const NetworkSelect = (props: NetworkSelectProps) => {
  const { value, onChange, ...selectProps } = props;

  const archives = useArchives();

  /*const [archive, setArchive] = React.useState(archives[0]);

  const navigate = useNavigate();

  useEffect(() => {
    let network = defaultNetwork || localStorage.getItem("network");

    if (!network) {
      network = archive.network;
      localStorage.setItem("network", network);
    }

    setArchive(archives.find((a) => a.network === network) || archives[0]);
  }, []);*/

  console.log("V", value);

  useEffect(() => {
    console.log(value, onChange, archives.length > 0);
    if (!value && onChange && archives.length > 0) {
      console.log("change", archives[0].network);
      onChange(archives[0].network);
    }
  }, [value, onChange, archives]);

  const handleArchiveChange = useCallback(
    (e: any) => {
      onChange && onChange(e.target.value);

      /*const archive = archives.find(
      (archive: any) => archive.network === e.target.value
    );
    if (archive) {
      setArchive(archive);
      localStorage.setItem("network", e.target.value);
      navigate("/");
    }*/
    },
    [onChange]
  );

  return (
    <StyledSelect
      {...selectProps}
      className={cx("calamar-button", props.className)}
      onChange={handleArchiveChange}
      //size="small"
      value={value || ""}
    >
      {archives.map((archive) => (
        <MenuItem key={archive.network} value={archive.network}>
          {archive.network}
        </MenuItem>
      ))}
    </StyledSelect>
  );
};

export default NetworkSelect;
