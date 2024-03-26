/* @flow */
/** @jsx node */

import {
  VenmoLogoExternalImage,
  VenmoLogoInlineSVG,
  LOGO_COLOR,
} from "@paypal/sdk-logos/src";
import { PLATFORM } from "@paypal/sdk-constants/src";

import { BUTTON_COLOR, BUTTON_LAYOUT } from "../../constants";
import { DEFAULT_FUNDING_CONFIG, type FundingSourceConfig } from "../common";

import { WalletLabel, Label } from "./template";

export function getVenmoConfig(): FundingSourceConfig {
  return {
    ...DEFAULT_FUNDING_CONFIG,

    layouts: [BUTTON_LAYOUT.HORIZONTAL, BUTTON_LAYOUT.VERTICAL],

    eligible: ({ experiment, shippingChange }) => {
      if (experiment && experiment.enableVenmo === false) {
        return false;
      }

      if (
        experiment &&
        experiment.venmoWebEnabled === false &&
        shippingChange
      ) {
        return false;
      }

      return true;
    },

    requires: ({ experiment, platform }) => {
      if (platform === PLATFORM.MOBILE && experiment.venmoWebEnabled === false) {
        return {
          native: true,
          popup: true,
        };
      }

      return {};
    },

    Logo: ({ logoColor, optional }) => {
      if (__WEB__) {
        return VenmoLogoExternalImage({ logoColor, optional });
      }

      return VenmoLogoInlineSVG({ logoColor, optional });
    },

    Label: ({ ...props }) => {
      return Label(props);
    },

    WalletLabel: (...props) => WalletLabel(...props),

    showWalletMenu: () => false,

    colors: [
      BUTTON_COLOR.BLUE,
      BUTTON_COLOR.SILVER,
      BUTTON_COLOR.BLACK,
      BUTTON_COLOR.WHITE,
    ],

    logoColors: {
      [BUTTON_COLOR.BLUE]: LOGO_COLOR.WHITE,
      [BUTTON_COLOR.SILVER]: LOGO_COLOR.BLUE,
      [BUTTON_COLOR.BLACK]: LOGO_COLOR.WHITE,
      [BUTTON_COLOR.WHITE]: LOGO_COLOR.BLUE,
    },

    secondaryColors: {
      ...DEFAULT_FUNDING_CONFIG.secondaryColors,

      [BUTTON_COLOR.GOLD]: BUTTON_COLOR.BLUE,
      [BUTTON_COLOR.BLUE]: BUTTON_COLOR.SILVER,
      [BUTTON_COLOR.SILVER]: BUTTON_COLOR.BLUE,
    },
  };
}
